import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentInsertDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


const HomeContentAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
            const contentDocument = await allDocumentInCollections(client, 'home-content', { _id: -1 })
            client.close()
            res.status(200).json({ messages: 'Success', result: { data: { homeContent: contentDocument } } })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }

    }

    //POST
    if (req.method === 'POST') {
        const { title, slogan, description, btnName, videoLink } = req.body;

        if (
            !title || title.trim() === '' &&
            !description || description.trim() === '' &&
            !slogan || slogan.trim() === '' &&
            !btnName || btnName.trim() === '' &&
            !videoLink || videoLink.trim() === ''
        ) {
            res.status(422).json({ messages: "Invalid title and more area" })
            return
        }


        try {
            await documentInsertDataBase(client, 'home-content', { title, slogan, description, btnName, videoLink })
            client.close()
            res.status(201).json({ messages: 'Cool!! Created home content' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
    if (req.method === "PUT") {
        
        let homeContentId = mongoIDConvert(req.body._id)
        console.log(homeContentId);

        try {
            await documentUpdateMany(client, 'home-content', { _id: homeContentId }, req.body)
            client.close()
            res.status(200).json({ messages: 'Success edit home content field' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }

}


export default HomeContentAPI