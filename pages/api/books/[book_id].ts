import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentDeleteOneDataBase, documentFindDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


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
        let bookId = mongoIDConvert(req.query.book_id)

        console.log(bookId);

        try {
            const bookDocument = await documentFindDataBase(client, 'books', { _id: bookId })

            if(!bookDocument){
                res.status(422).json({messages:"Not found book"})
                client.close()
                return
            }

            client.close()
            res.status(200).json({ messages: 'Success', result: { data: { book: bookDocument } } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }


    if(req.method === "PUT"){
        let bookId = mongoIDConvert(req.query.book_id)
        console.log(bookId);
        
        try {
            await documentUpdateMany(client, 'books', { _id: bookId },req.body)
            client.close()
            res.status(200).json({ messages: 'Success edit book field'})
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }


    if(req.method === "DELETE"){
        let bookId = mongoIDConvert(req.query.book_id)

        try {
            await documentDeleteOneDataBase(client, 'books', { _id: bookId })
            client.close()
            res.status(200).json({ messages: 'Success deleted book'})
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }
}


export default BooksApi