const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/location?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function Update() {
    try {
        await client.connect();

        await updateByNom(client, "Bodo", {age: 27});

    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

Update().catch(console.dir);

async function updateByNom(client, nom, updatedDoc) {
    const res = await client.db('location').collection('personnes').updateOne(
        {nom: nom}, {$set: updatedDoc});

    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}

