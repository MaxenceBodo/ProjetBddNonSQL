const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert(){
    try{
        await client.connect();
        await insertFacture(client);
    }catch(error){
        console.log(error);
    }finally{
        client.close();
    }
}

//insert().catch(console.dir);

async function insertFacture(client){
    await createFacture(client,[
        {
            _id:1,
            idContrat:1,
            montant:500,
            dateFacture:"2022-03-30"
        },{
            _id:2,
            idContrat:2,
            montant:1000,
            dateFacture:"2021-11-31"
        },{
            _id:3,
            idContrat:3,
            montant:1500,
            dateFacture:"2022-02-04"
        }
    ])
}

async function createFacture(client, valeur) {
    const result = await client.db("location").collection("facture").insertMany(valeur);
    console.log(`Les facture ont été inseré`);
}

module.exports = {insertFacture}