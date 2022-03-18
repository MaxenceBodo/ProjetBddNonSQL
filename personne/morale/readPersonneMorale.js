const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les entreprises");
        await FindAll(client);
        console.log("")
        console.log("Affiche les entreprises avec un pays");
        await findByPays(client, "France");
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}

async function FindAll(client) {
    const rx = await client.db('location').collection('personnesMorales').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByPays(client,pays){
    const res = await client.db('location').collection("personnesMorales").find({"adresse.pays": pays});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}

async function findBySiret(client,SIRET){
    const res = await client.db('location').collection("personnesMorales").find({"SIRET": SIRET});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}