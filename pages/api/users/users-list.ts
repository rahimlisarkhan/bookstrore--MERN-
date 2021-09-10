import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


const UsersAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
            const contactDocument = await allDocumentInCollections(client, 'users', { _id: -1 })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: { users: contactDocument } } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === "PUT") {
        let bookId = mongoIDConvert(req.query.book_id)
        console.log(bookId);

        try {
            await documentUpdateMany(client, 'users', { _id: bookId }, req.body)
            client.close()
            res.status(200).json({ messages: 'Success edit book field' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }


}


export default UsersAPI