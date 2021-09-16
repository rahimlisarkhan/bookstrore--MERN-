import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentFindDataBase, documentInsertDataBase } from "../../../db/mongoDB";


const RegisterAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    let client: any

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
        const { full_name, gender, password, email } = req.body;

        if (
            !full_name || full_name.trim() === '' &&
            !password || password.trim() === '' &&
            !email || email.trim() === '' || !email.includes('@')
        ) {
            res.status(422).json({ messages: "Invalid full name and more area" })
            return
        }


        try {
            let user = await documentFindDataBase(client, 'users', { email })

            if (user) {
                res.status(422).json({ messages: "This is email but register" })
                client.close()
                return
            }

            await documentInsertDataBase(client, 'users', { full_name, gender, password, email })
            client.close()
            res.status(201).json({ messages: 'Cool!! Created new user' })

        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }

}


export default RegisterAPI