const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
    await createManyVehicule(client,[{
        prixTotal = 20000,
        anneeMiseEnService:2017,
        kilometrage:76524,
        etatVehicule:"non loue",
        marque:{
            nom:"BMW",
            
        }
    }])
}