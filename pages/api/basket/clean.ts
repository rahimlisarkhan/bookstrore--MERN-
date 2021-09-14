import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectDataBase, documentDeleteManyDataBase } from "../../../db/mongoDB";


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

        const {  user_email } = req.body
        const email = user_email


        // let { user: { email } } = await getSession({ req: req })
        
        const basketProduct = await documentDeleteManyDataBase(client, 'baskets', { user_email: email })

        if (!basketProduct) {
            res.status(422).json({ messages: "Empty basket" })
            client.close()
            return
        }


        try {
            await documentDeleteManyDataBase(client, 'baskets', { user_email: email })
            client.close()
            res.status(200).json({ messages: 'OK' })

        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}


export default BasketAPI