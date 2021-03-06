import { hashPassword } from "../utils/const-util";

const { MongoClient } = require('mongodb');


//CONNECT DATABASE
export const connectDataBase: Function = async () => {
    const url = `mongodb+srv://codio:Nln3rszwEtQTYgEY@cluster0.crnrw.mongodb.net/BookStoreDatabase?retryWrites=true&w=majority`
    const client = await MongoClient.connect(url)

    return client
}

//MongoDB ID CONVERT
export const mongoIDConvert: Function = (id: string) => {
    let ObjectId = require('mongodb').ObjectId;
    let o_id = new ObjectId(id);

    return o_id
}

//DOCUMENT
export const documentInsertDataBase: Function = async (client: any, collection: string, document: any) => {

    if (document.password) {
        document.password = await hashPassword(document.password)
    }

    const result = await client.db().collection(collection).insertOne(document);

    return result;
}

//DELETE
export const documentDeleteOneDataBase: Function = async (client: any, collection: string, findDocument: object) => {

    const result = await client.db().collection(collection).deleteOne(findDocument);
    return result;
}

export const documentDeleteManyDataBase: Function = async (client: any, collection: string, findDocument: object) => {

    const result = await client.db().collection(collection).deleteMany(findDocument);
    return result;
}


//UPDATE

export const documentUpdateOne = async (client: any, collection: string, findDocument: object, updateFields: any) => {

    if (updateFields.password) {
        updateFields.password = await hashPassword(updateFields.password)
    }

    const result = await client.db().collection(collection).updateOne(findDocument, { $set: updateFields });

    return result;
}


export const documentUpdateMany = async (client: any, collection: string, findDocument: object, updateFields: any) => {
    const options = { multi: true }

    delete updateFields._id

    if (updateFields.password) {
        updateFields.password = await hashPassword(updateFields.password)
    }

    const result = await client.db().collection(collection).updateMany(findDocument, { $set: updateFields }, options);

    return result;
}


//F??ND
export const documentFindDataBase: Function = async (client: any, collection: string, document: object) => {

    const result = client.db().collection(collection).findOne(document)

    return result
}

export const documentAllFindDataBase: Function = async (client: any, collection: string, document: object) => {

    const result = client.db().collection(collection).find(document).toArray()
    return result
}


//ALL DOCUMENT
export const allDocumentInCollections: Function = async (client: any, collection: string, sort: object) => {

    const result = await client.db().collection(collection).find().sort(sort).toArray();

    // if (result.length === 1) {
    //     return { ...result[0] }
    // }
    return result
}



