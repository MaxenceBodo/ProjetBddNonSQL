const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert(){
    try{
        await client.connect();
        await insertVehicule(client);
    }catch(error){
        console.log(error);
    }finally{
        client.close();
    }
}

//insert().catch(console.dir);

async function insertVehicule(client){
    await createVehicule(client,[{
        _id:1,
        anneeMiseEnService:2017,
        kilometrage:76524,
        etatVehicule:"non loue",
        marque:"BMW",
        modele:2
    },{
        _id:2,
        anneeMiseEnService:2015,
        kilometrage:102365,
        etatVehicule:"non loue",
        marque:"Audi",
        modele:1
    },{
        _id:3,
        anneeMiseEnService:2007,
        kilometrage:251325,
        etatVehicule:"non loue",
        marque:"Tesla",
        modele:3
    }])
}

async function createVehicule(client, valeur) {
    const result = await client.db("location").collection("vehicule").insertMany(valeur);
    console.log(`Les vehicules ont été inseré ${result.insertedIds.toString()}`);
}

async function createVehiculeOne(client, valeur) {
    const result = await client.db("location").collection("vehicule").insertOne(valeur);
    console.log('insere');
}

module.exports= {createVehiculeOne};