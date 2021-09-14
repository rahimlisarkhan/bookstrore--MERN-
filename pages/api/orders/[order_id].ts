import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentAllFindDataBase, documentDeleteManyDataBase, mongoIDConvert } from "../../../db/mongoDB";


const BooksApi = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PATCH") {
        return
    }

    let client: any

    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }

    if (req.method === "GET") {
        let orderId = mongoIDConvert(req.query.order_id)
        const email = req.body.user_email

        try {
            const orderDocument = await documentAllFindDataBase(client, 'orders', { _id: orderId, user_email: email })

            if (orderDocument.length === 0) {
                res.status(422).json({ messages: "Not found order" })
                client.close()
                return
            }

            let total_summary = 0
            orderDocument.map((item: any) => total_summary += +item.total_summary)
            res.status(200).json({ messages: 'OK', result: { data: { total_summary, orderlist: orderDocument } } })
            client.close()
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }


    if (req.method === "DELETE") {
        let orderId = mongoIDConvert(req.query.order_id)
        const orderDocument = await documentAllFindDataBase(client, 'orders', { _id: orderId })

        if (orderDocument.length === 0) {
            res.status(422).json({ messages: "Not found order" })
            client.close()
            return
        }

        try {
            await documentDeleteManyDataBase(client, 'orders', { _id: orderId })
            client.close()
            res.status(200).json({ messages: 'Success deleted order' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }
}


export default BooksApi