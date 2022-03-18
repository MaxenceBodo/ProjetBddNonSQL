const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Update() {
    try {
        await client.connect();
        await updateByNom(client, 44306184100047, {nomEntreprise: "Amazon"});
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
Update().catch(console.dir);

async function updateBySIRET(client, SIRET, updatedDoc) {
    const res = await client.db('location').collection('personnesMorales').updateOne(
        {"SIRET": SIRET}, {$set: updatedDoc});

    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}
