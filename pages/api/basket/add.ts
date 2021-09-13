import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectDataBase, documentAllFindDataBase, documentFindDataBase, documentInsertDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


const BasketAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    let client: any
    if (req.method === "PATCH") {
        return
    }

    //CONNECT
    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }


    //POST
    if (req.method === 'POST') {
        // let bookId = mongoIDConvert(req.body.book_id)
        // const { book_id } = req.body
        // let { user: { email } } = await getSession({ req: req })

        const { book_id, user_email } = req.body
        const email = user_email


        if (!book_id) {
            res.status(422).json({ messages: "Invalid basket and more area" })
            return
        }

        const basketProduct = await documentAllFindDataBase(client, 'baskets', { user_email: email, book_id })



        if (basketProduct.length === 0) {
            res.status(422).json({ messages: "Invalid basket" })
            client.close()
            return
        }

        const { count, price } = basketProduct[0]

        const updateCount = count + 1
        const updateSummary = +(+price * updateCount).toFixed(2)

        try {
            basketProduct[0].count = updateCount
            basketProduct[0].summary = updateSummary

            await documentUpdateMany(client, 'baskets', {user_email: email, book_id }, { count: updateCount, summary: +updateSummary })
            client.close()
            res.status(200).json({ messages: 'OK', result: { data: { book: { ...basketProduct[0] } } } })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}


export default BasketAPI