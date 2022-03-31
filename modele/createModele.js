const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert(){
    try{
        await client.connect();
        await insertModele(client);
    }catch(error){
        console.log(error);
    }finally{
        client.close();
    }
}

insert().catch(console.dir);

async function insertModele(client){
    await createModele(client,[
        {
            _id:1,
            nom:"SUV",
            prixModele:100
        },{
            _id:2,
            nom:"voiture",
            prixModele:70
        },{
            _id:3,
            nom:"fourgonette",
            prixModele:120
        }
    ])
}

async function createModele(client, valeur) {
    const result = await client.db("location").collection("modele").insertMany(valeur);
    console.log(`Les modèles ont été inseré`);
}
