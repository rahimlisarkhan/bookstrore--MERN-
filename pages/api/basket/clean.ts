import { NextApiRequest, NextApiResponse } from "next";
import { allDocumentInCollections, connectDataBase, documentDeleteDataBase, documentFindDataBase, documentUpdateMany, mongoIDConvert } from "../../../db/mongoDB";


const BooksApi = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PATCH") {
        return
    }

    let client: any

    try {
        client = await connectDataBase()

    } catch {
        res.status(500).json({ messages: 'Sorry.Connect error for database.Please check database' })
        client.close()
        return
    }


    if (req.method === "PUT") {
        let bookId = mongoIDConvert(req.query.book_id)
        console.log(bookId);

        try {
            await documentUpdateMany(client, 'books', { _id: bookId }, req.body)
            client.close()
            res.status(200).json({ messages: 'Success edit book field' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }


    if (req.method === "DELETE") {
        let basket_id = mongoIDConvert(req.query.basket_id)

        try {

            const basketProduct = await documentFindDataBase(client, 'baskets', { _id: basket_id })

            if (!basketProduct) {
                res.status(422).json({ messages: "Product already delete!" })
                client.close()
                return
            }

            await documentDeleteDataBase(client, 'baskets', { _id: basket_id })
            client.close()
            res.status(200).json({ messages: 'Success delete book in basket' })
        } catch {
            client.close()
            res.status(500).json({ messages: 'Server error' })
        }
    }
}


export default BooksApi