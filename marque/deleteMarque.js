const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteByMarque(client, "BMW");
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}
Delete().catch(console.dir);

async function deleteByMarque(client,marque) {
    const res = await client.db("location").collection("marque").deleteOne({"nom":marque});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}