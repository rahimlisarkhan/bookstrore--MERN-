import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";
import { getSession } from 'next-auth/client'

const UserAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
        let user = await getSession({ req: req })

        console.log(user);

        try {
            const userDocument = await allDocumentInCollections(client, 'users', { email: user.email })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: { user: userDocument } } })
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


export default UserAPI