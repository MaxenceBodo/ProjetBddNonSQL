const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Update() {
    try {
        await client.connect();
        await updateById(client, {kilometrage:76524}, {kilometrage:76530});
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
Update().catch(console.dir);

async function updateById(client, filtre, updatedDoc) {
    const res = await client.db('location').collection('vehicule').updateOne(
        filtre, {$set: updatedDoc});

    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}
