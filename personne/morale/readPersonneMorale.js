const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/location?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        /*** APPEL DES DIFFERENTES METHODES */
        // await findByname(client, "Bodo");
        await FindAll(client);
        // await findByVille(client, "Villejuif");
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
