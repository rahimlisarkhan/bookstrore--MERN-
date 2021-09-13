import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
    allDocumentInCollections,
    connectDataBase,
    documentAllFindDataBase,
    documentDeleteManyDataBase,
    documentInsertDataBase
} from "../../../db/mongoDB";
import { convertNormalDate } from "../../../utils/const-util";


const orderAPI = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "PATCH") {
        return
    }

    let client: any

    try {
        client = await connectDataBase()
    } catch {
        res.status(500).json({ messages: "Server error" })
        return
    }

    if (req.method === "GET") {
        let { user: { email } } = await getSession({ req: req })


        const allOrderList = await documentAllFindDataBase(client, 'orders', { user_email: email })

        if (!allOrderList) {
            res.status(422).json({ messages: "Order send already!" })
            return
        }

        try {

            let total_summary = 0
            allOrderList.map((item: any) => total_summary += +item.total_summary)

            res.status(200).json({
                messages: "OK",
                result: {
                    data: {
                        total_summary,
                        orders: allOrderList
                    }
                }
            })
            client.close()

        } catch {

            res.status(500).json({ messages: "Invalid send order" })
            client.close()
            return
        }

    }

    if (req.method === "POST") {

        const { user_email, contact_phone, fullname, payment } = req.body

        const email = user_email
        const created_order = convertNormalDate(new Date(), true)


        if (!contact_phone || contact_phone.trim('') &&
            !fullname && !payment) {
            res.status(422).json({ messages: "invalid area" })
            return
        }

        const basketProduct = await documentAllFindDataBase(client, 'baskets', { user_email: email })

        if (basketProduct.length === 0) {
            res.status(422).json({ messages: "Order send already!" })
            return
        }

        try {
            let total_summary = 0
            basketProduct.map((item: any) => total_summary += +item.summary)
            let result = await documentInsertDataBase(client,
                "orders", {
                user_email: email,
                contact_phone,
                fullname,
                payment,
                total_summary,
                created_order,
                orderlist: basketProduct
            })

            if (result) {
                await documentDeleteManyDataBase(client, 'baskets', { user_email: email })
            }
            res.status(200).json({ messages: "Order success send and you basket cleaned" })
            client.close()

        } catch {

            res.status(500).json({ messages: "Invalid send order" })
            client.close()
            return
        }

    }

}
export default orderAPI