import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentInsertDataBase } from "../../../db/mongoDB";


const ContactAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    let client: any

    //CONNECT
    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }

    //GET
    if (req.method === "GET") {

        try {
            const contactDocument = await allDocumentInCollections(client, 'contact', { _id: -1 })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: { contact: contactDocument } } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === 'POST') {
        const { title, address, description, email, phone } = req.body;

        if (
            !title || title.trim() === '' &&
            !description || description.trim() === '' &&
            !address || address.trim() === '' &&
            !email || email.trim() === '' &&
            !phone || phone.trim() === ''
        ) {
            res.status(422).json({ messages: "Invalid title and more area" })
            return
        }


        try {
            await documentInsertDataBase(client, 'contact', { title, address, description, email, phone })
            client.close()
            res.status(201).json({ messages: 'Cool!! Created new contact' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }

}


export default ContactAPI