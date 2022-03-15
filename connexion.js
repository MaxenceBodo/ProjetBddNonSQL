const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri);

async function main() {
    try{
        await client.connect(console.log('Connexion reussie !'))
    }catch (error){
        console.log(error);
    }finally{
        client.close()
    }
}

main().catch(console.dir)