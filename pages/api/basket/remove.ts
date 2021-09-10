import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectDataBase, documentAllFindDataBase, documentDeleteDataBase, documentFindDataBase, documentInsertDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


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
        let basket_id = mongoIDConvert(req.body.basket_id)

        if (
            !basket_id
        ) {
            res.status(422).json({ messages: "Invalid basket and more area" })
            return
        }

        const basketProduct = await documentFindDataBase(client, 'baskets', { _id: basket_id })

        if (!basketProduct) {
            res.status(422).json({ messages: "Invalid basket" })
            client.close()
            return
        }

        const { count } = basketProduct
        const updateCount = count - 1 

        try {
            if (updateCount === 0) {
                await documentDeleteDataBase(client, 'baskets', { _id: basket_id })
                client.close()
                res.status(200).json({ messages: 'OK' })
                return
            }

            await documentUpdateMany(client, 'baskets', { _id: basket_id }, { count: updateCount })
            client.close()
            res.status(200).json({ messages: 'product minus' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}


export default BasketAPI