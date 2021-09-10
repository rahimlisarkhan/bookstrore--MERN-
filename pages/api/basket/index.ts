import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { allDocumentInCollections, connectDataBase, documentInsertDataBase } from "../../../db/mongoDB";


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
        const userInfo = await getSession({req:req})
        // let bookId = mongoIDConvert(req.query.book_id)

        console.log(userInfo);

        try {
            const basketsDocument = await allDocumentInCollections(client, 'baskets', { user_id: userInfo.id })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: basketsDocument } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === 'POST') {
        const { book: { title, author, description, price, trend }, user_id } = req.body;

        const session = await getSession({ req: req })
        // let bookId = mongoIDConvert(req.query.book_id)

        console.log(session);


        if (
            !title || title.trim() === '' &&
            !description || description.trim() === '' &&
            !author || author.trim() === '' &&
            !price || price.trim() === '' &&
            !trend || trend.trim() === '' &&
            !user_id
        ) {
            res.status(422).json({ messages: "Invalid title and more area" })
            return
        }


        try {
            await documentInsertDataBase(client, 'baskets', { book: { title, author, description, price, trend }, user_id })
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