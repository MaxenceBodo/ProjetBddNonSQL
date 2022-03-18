const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
    const res = await client.db('location').collection('personnesPhysiques').findOne({nom: name});

    if (!res) {
        console.log('Personne inexistante');
        return
    }

    console.log(`Personne '${name}'`);
    console.log(res);

}


async function FindAll(client) {
    const rx = await client.db('location').collection('personnesPhysiques').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByVille(client, ville) {
    const res = await client.db('location').collection("personnesPhysiques").find({"adresse.ville": ville});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });

}


