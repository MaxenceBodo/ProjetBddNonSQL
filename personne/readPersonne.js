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

Read().catch(console.dir);


async function findByname(client, name) {
    const res = await client.db('location').collection('personnes').findOne({nom: name});

    if (!res) {
        console.log('Personne inexistante');
        return
    }

    console.log(`Personne '${name}'`);
    console.log(res);

}


async function FindAll(client) {
    const rx = await client.db('location').collection('personnes').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByVille(client, ville) {
    const res = await client.db('location').collection("personnes").find({"adresse.ville": ville});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });

}


