const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main(){
    try{
        await client.connect();
        await CRUDcreate
    }catch(error){
        console.log(error);
    }finally{
        client.close();
    }
}