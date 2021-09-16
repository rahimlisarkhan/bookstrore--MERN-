import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentFindDataBase, documentUpdateOne } from "../../../db/mongoDB";
import { verifyPassword } from "../../../utils/const-util";


const ChangePasswordAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
        const { email, password, new_password } = req.body

        // const oldPassword = password.toString()

        if (!email) {
            res.status(422).json({ messages: "Invalid email and more area" })
            client.close()
            return
        }

        const user = await documentFindDataBase(client, 'users', { email })

        if (!user) {
            res.status(401).json({ messages: "Not user.Please register again.." })
            client.close()
            return
        }

        // const isValid = await verifyPassword(password, user.password)

        console.log(new_password);


        // if (!isValid) {
        //     res.status(403).json({ messages: "Wrong password" })
        //     client.close()
        //     return
        // }


        try {
            await documentUpdateOne(client, 'users', { email }, { password: new_password })
            res.status(200).json({ messages: 'Password changed' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }
    }
}


export default ChangePasswordAPI