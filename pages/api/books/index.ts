import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentInsertDataBase } from "../../../db/mongoDB";


const BooksApi = async (req: NextApiRequest, res: NextApiResponse) => {
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

        try {
            const booksDocument = await allDocumentInCollections(client, 'books', { _id: -1 })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: booksDocument } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === 'POST') {
        const { title, author, description, price, trend } = req.body;

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


        try {
            await documentInsertDataBase(client, 'books', { title, author, description, price, trend })
            client.close()
            res.status(201).json({ messages: 'Cool!! Created new book' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}


export default BooksApi