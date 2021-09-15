import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/client";
import { connectDataBase, documentAllFindDataBase, documentUpdateOne } from "../../../db/mongoDB";


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
        // let { user: { email } } = await getSession({ req: req })

        const { email, new_password } = req.body


        if (!email) {
            res.status(422).json({ messages: "Invalid basket and more area" })
            client.close()
            return
        }

        const user = await documentAllFindDataBase(client, 'test', { email })

        console.log(user);

        // const newPassword = await hashPassword(new_password)

        try {
            await documentUpdateOne(client, 'users', { email }, { password: new_password })
            res.status(200).json({ messages: 'OK', result: { data: 's' } })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}


export default ChangePasswordAPI