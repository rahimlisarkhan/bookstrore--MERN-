import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectDataBase, documentAllFindDataBase } from "../../../db/mongoDB";


const FavoriteAPI = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "PATCH") {
        return
    }

    //CONNECT
    let client: any

    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }


    if (req.method === "GET") {
        // let { user: { email } } = await getSession({ req: req })
        let email = "test3@gmail.com"


        try {
            const favoriteProduct = await documentAllFindDataBase(client, 'favorites', { user_email: email })
            client.close()
            res.status(200).json({
                messages: 'OK',
                result: {
                    data: {
                        favorites: favoriteProduct
                    }
                }
            })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }
}

export default FavoriteAPI