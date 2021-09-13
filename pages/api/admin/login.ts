import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentFindDataBase } from "../../../db/mongoDB";
import { verifyPassword } from "../../../utils/const-util";


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
        const { password, email } = req.body;

        if (
            !password || password.trim() === '' &&
            !email || email.trim() === '' || !email.includes('@')
        ) {
            res.status(422).json({ messages: "Invalid email or password area" })
            return
        }



        try {

            let user = await documentFindDataBase(client, 'users', { email })


            if (!user) {
                client.close()
                throw new Error('User not found')
            }

            const isValid = await verifyPassword(password, user.password)

            if (!isValid) {
                client.close()
                throw new Error('Could not log you in')
            }

            delete user.password

            res.status(200).json({ messages: 'OK', result: { data: user } })
            client.close()

        } catch {
            res.status(500).json({ messages: "Email and password error" })
            client.close()
            return
        }

    }
}


export default RegisterAPI