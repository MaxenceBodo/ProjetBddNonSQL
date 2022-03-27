const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche tous les modèles");
        await FindAll(client);
        
        console.log("___________________________________________________________")

        console.log("Affiche un modèle");
        await findByMarque(client, "SUV");


    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);


async function FindAll(client) {
    const rx = await client.db('location').collection('modele').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByMarque(client, modele){
    const res = await client.db('location').collection("modele").find({"nom":modele});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}

