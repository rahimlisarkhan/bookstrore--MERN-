import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, documentAllFindDataBase, documentDeleteManyDataBase, documentFindDataBase, documentInsertDataBase, mongoIDConvert } from "../../../db/mongoDB";


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


    //POST
    if (req.method === 'POST') {
        const { book_id, user_email } = req.body;

        // let { user: { email } } = await getSession({ req: req })
        const email = user_email

        const bookfindID = mongoIDConvert(book_id)



        if (!book_id || book_id.trim() === '') {
            res.status(422).json({ messages: "Invalid title and more area" })
            return
        }


        //Find favorites collection in book
        const favoritesProduct = await documentAllFindDataBase(client, 'favorites', { user_email: email, book_id: bookfindID })

        if (favoritesProduct.length >= 1) {
            await documentDeleteManyDataBase(client, 'favorites', { user_email: email, book_id: bookfindID })
            client.close()
            res.status(200).json({ messages: 'Favorite Deleted' })
            client.close()
            return
        }


        //Find book
        const booksProduct = await documentFindDataBase(client, 'books', { _id: bookfindID })
        const { title, author, name, description, price, trend, } = booksProduct;




        try {
            await documentInsertDataBase(client,
                'favorites',
                {
                    user_email: email,
                    book_id,
                    title,
                    author,
                    name,
                    description,
                    price,
                    trend
                })
            client.close()
            res.status(201).json({ messages: 'Favorite Added' })
        } catch {
            res.status(500).json({ messages: "Insertin data failed" })
            client.close()
            return
        }

    }
}

export default FavoriteAPI