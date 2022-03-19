const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();

        console.log("Affiche tous les vehicules");
        await findAll(client);
        console.log("___________________________________________________________")

        console.log("Affiche toutes les vehicules etant des voitures");
        await findByModele(client,2)
        
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);

async function findAll(client) {
    const rx = await client.db('location').collection('vehicule').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByModele(client, id) {
    const rx = await client.db('location').collection('vehicule').find({"modele":id});
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}