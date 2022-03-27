const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

insert().catch(console.dir);

async function insertVehicule(client){
    await createVehicule(client,[{
        _id:1,
        prixJour : 20000,
        anneeMiseEnService:2017,
        kilometrage:76524,
        etatVehicule:"non loue",
        marque:5,
        modele:2
    },{
        _id:2,
        prixJour : 15312,
        anneeMiseEnService:2015,
        kilometrage:102365,
        etatVehicule:"loue",
        marque:1,
        modele:1
    },{
        _id:3,
        prixJour :8500,
        anneeMiseEnService:2007,
        kilometrage:251325,
        etatVehicule:"loue",
        marque:4,
        modele:3
    }])
}

async function createVehicule(client, valeur) {
    const result = await client.db("location").collection("vehicule").insertMany(valeur);
    console.log(`Les vehicules ont été inseré ${result.insertedIds.toString()}`);
}
