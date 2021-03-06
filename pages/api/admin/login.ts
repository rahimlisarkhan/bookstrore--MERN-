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
        const oldPassword = password.toString() 

        if (
            !oldPassword || oldPassword.trim() === '' &&
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

            const isValid = await verifyPassword(oldPassword, user.password)
            
            if (!isValid) {
                res.status(500).json({ messages: "Wrong password" })
                client.close()
                return
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