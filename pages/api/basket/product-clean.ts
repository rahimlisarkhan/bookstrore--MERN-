import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectDataBase, documentAllFindDataBase, documentDeleteAllDataBase, documentDeleteDataBase, documentFindDataBase, documentInsertDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


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
    if (req.method === "POST") {
        let bookId = mongoIDConvert(req.body.book_id)
        let email = req.body.user_email



        try {
            const basketProduct = await documentDeleteAllDataBase(client, 'baskets', { user_email: email, book_id: bookId })


            // if (!basketProduct) {
            //     res.status(422).json({ messages: "Error! Already book in basket deleted" })
            //     client.close()
            //     return
            // }

            client.close()
            res.status(200).json({ messages: 'Success deleted book in basket' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }
}


export default BasketAPI