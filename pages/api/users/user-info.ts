import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentAllFindDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";
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
        // let {user:{email}} = await getSession({ req: req })
        const email = req.body.user_email

        try {
            const orderDocument = await documentAllFindDataBase(client, 'users', { email })

            if (orderDocument.length === 0) {
                res.status(422).json({ messages: "User not found" })
            }

            console.log(orderDocument);
            delete orderDocument[0].password
            res.status(200).json({ messages: 'OK', result: { data: { user: { ...orderDocument[0] } } } })
            client.close()
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === "PUT") {

        try {
            await documentUpdateMany(client, 'users', { email:req.body.email }, req.body)
            client.close()
            res.status(200).json({ messages: 'OK' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }


}


export default UserAPI