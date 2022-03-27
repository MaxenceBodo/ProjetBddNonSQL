const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Update() {
    try {
        await client.connect();
        await updateByModele(client, "voiture", {prixModele:100});
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
Update().catch(console.dir);

async function updateByModele(client, modele, updatedDoc) {
    const res = await client.db('location').collection('modele').updateOne({"nom":modele}, {$set: updatedDoc});
    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}
