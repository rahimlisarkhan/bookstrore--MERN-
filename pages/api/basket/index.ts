import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectDataBase, documentAllFindDataBase, documentInsertDataBase } from "../../../db/mongoDB";


const BasketAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    let client: any


    //CONNECT
    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }

    //GET
    if (req.method === "GET") {
        let { user: { email } } = await getSession({ req: req })
        const basketProduct = await documentAllFindDataBase(client, 'baskets', { user_email: email })

        let total_summary = 0
        basketProduct.map((item: any) => total_summary += +item.summary)

        try {
            const basketsDocument = await documentAllFindDataBase(client, 'baskets', { user_email: email })
            client.close()
            res.status(200).json({
                messages: 'OK',
                result: {
                    data: {
                        total_count: basketsDocument.length,
                        total_summary,
                        books: basketsDocument
                    }
                }
            })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === 'POST') {
        const { book_id, title, author, name, description, price, trend, user_email } = req.body;

        const email = user_email

        // let { user: { email } } = await getSession({ req: req })

        if (
            !title || title.trim() === '' &&
            !description || description.trim() === '' &&
            !author || author.trim() === '' &&
            !price || price.trim() === '' &&
            !trend || trend.trim() === ''

        ) {
            res.status(422).json({ messages: "Invalid title and more area" })
            return
        }
        const basketProduct = await documentAllFindDataBase(client, 'baskets', { user_email: email, book_id })



        if (basketProduct.length === 1) {
            res.status(422).json({ messages: "Book already add basket!" })
            client.close()
            return
        }


        try {
            await documentInsertDataBase(client,
                'baskets',
                {
                    count: 1,
                    user_email: email,
                    book_id: book_id,
                    title,
                    author,
                    name,
                    description,
                    price,
                    trend
                })
            client.close()
            res.status(201).json({ messages: 'Cool!! Added book you basket' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}


export default BasketAPI