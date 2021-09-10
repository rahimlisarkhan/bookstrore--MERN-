import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
// import path from 'path';
import { getSession } from 'next-auth/client';
import { connectDataBase, documentInsertDataBase } from '../../../db/mongoDB';

// export function buildFeedbackPath(folder:string,pathname:string) {
//     return path.join(process.cwd(), folder, pathname);
// }

// export function extractFeedback(filePath) {
//     const fileData: any = fs.readFileSync(filePath);
//     const data = JSON.parse(fileData);
//     return data;
// }


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let client: any;

    try {
        client = await connectDataBase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        client.close()
        return;
    }


    if (req.method === 'POST') {
        const { text, author, date } = req.body
        let newFeedback = { text, author, date };
        
        let userinfo = await getSession({req:req})
        console.log(userinfo);


        if (!text || text.trim() === '' &&
            !author || author.trim() === '' &&
            !date || date.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid cell.Please write!' });
            return
        }


        try {
            await documentInsertDataBase(client, 'feedbacks', newFeedback);
            client.close();
            res.status(201).json({ message: 'Success!', feedback: newFeedback });

        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed!' });
            client.close()
            return;
        }

        // const filePath = buildFeedbackPath();
        // const data = extractFeedback(filePath);
        // data.push(newFeedback)
        // fs.writeFileSync(filePath, JSON.stringify(data));


    }


}

export default handler
