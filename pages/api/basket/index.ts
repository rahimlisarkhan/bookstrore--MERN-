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

        try {
            const basketsDocument = await documentAllFindDataBase(client, 'baskets', { user_email: email })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: basketsDocument } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === 'POST') {
        const { book: {_id, title, author, name, description, price, trend }, user_email } = req.body;

        let { user: { email } } = await getSession({ req: req })

        if (
            !title || title.trim() === '' &&
            !description || description.trim() === '' &&
            !author || author.trim() === '' &&
            !price || price.trim() === '' &&
            !trend || trend.trim() === '' &&
            !user_email
        ) {
            res.status(422).json({ messages: "Invalid title and more area" })
            return
        }


        try {
            await documentInsertDataBase(client,
                'baskets',
                {
                    count: 1,
                    user_email,
                    book: {
                        _id,
                        title,
                        author,
                        name,
                        description,
                        price,
                        trend
                    }
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