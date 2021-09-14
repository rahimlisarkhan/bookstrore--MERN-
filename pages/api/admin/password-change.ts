
import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentFindDataBase, documentUpdateMany, documentUpdateOne } from "../../../db/mongoDB";
import { verifyPassword } from "../../../utils/const-util";


const AdminChangePasswordAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PATCH") {
        return
    }

    let client: any

    //CONNECT
    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }


    if (req.method === "POST") {
        const { email, password, new_password } = req.body

        if (!email || email.indexOf('@') &&
            !password || password.trim() === '') {
            res.status(422).json({ messages: "Invalid password and email" })
            client.close()
            return
        }

        const user = await documentFindDataBase(client, 'users', { email })

        if (!user) {
            res.status(422).json({ messages: "User not found.Please register" })
            client.close()
            return
        }

        const isValid = await verifyPassword(password, user.password)

        console.log(isValid);

        if (!isValid) {
            res.status(403).json({ messages: "Password error.Please true password" })
            client.close()
            return
        }

        try {
            const result = await documentUpdateOne(client, "users", { email: email }, { password: new_password })
            res.status(200).json({ messages: "Password updated!" })
            client.close()

        } catch {
            res.status(500).json({ messages: "Server Error" })
            client.close()
            return
        }
    }
}

export default AdminChangePasswordAPI