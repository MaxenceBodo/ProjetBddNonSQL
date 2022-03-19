const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert(){
    try{
        await client.connect();
        await insertMarque(client);
    }catch(error){
        console.log(error);
    }finally{
        client.close();
    }
}

insert().catch(console.dir);

async function insertMarque(client){
    await createMarque(client,[
        {
            _id:1,
            nom:"BMW",
            prixMarque:2
        },{
            _id:2,
            nom:"audi",
            prixMarque:3
        },{
            _id:3,
            nom:"peugeot",
            prixMarque:1
        },{
            _id:4,
            nom:"renaud",
            prixMarque:1
        },{
            _id:5,
            nom:"lamborghini",
            prixMarque:5
        }
    ])
}

async function createMarque(client, valeur) {
    const result = await client.db("location").collection("marque").insertMany(valeur);
    console.log(`Les modèles ont été inseré`);
}
