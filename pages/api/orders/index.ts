import { NextApiRequest, NextApiResponse } from "next";
import {
    allDocumentInCollections,
    connectDataBase,
    documentAllFindDataBase,
    documentDeleteManyDataBase,
    documentInsertDataBase
} from "../../../db/mongoDB";


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


        const allOrderList = await allDocumentInCollections(client, 'orders', { _id: -1 })

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

}
export default orderAPI