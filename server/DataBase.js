import {} from "dotenv/config";
import mongodb from "mongodb";

const client = new mongodb.MongoClient(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true, });

export const getCollection = (name) => client.db('library').collection(name);

export default client;