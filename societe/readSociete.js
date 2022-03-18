const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();

        console.log("Affiche toutes les agences");
        await findAll(client);
        console.log("___________________________________________________________")

        console.log("Affiche toutes les agences en France");
        await findByPays(client)
        
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);

async function findAll(client) {
    const rx = await client.db('location').collection('agence').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByPays(client, pays) {
    const rx = await client.db('location').collection('agence').find({"adresse.pays":agence});
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}