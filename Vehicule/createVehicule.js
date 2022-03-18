const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://maxence:1234@cluster0.g3zdj.mongodb.net/location?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main(){
    try{
        await client.connect();
        await CRUDcreate
    }
}