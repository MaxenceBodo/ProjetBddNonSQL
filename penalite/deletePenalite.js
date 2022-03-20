const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteById(client, 1);
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}
Delete().catch(console.dir);

async function deleteById(client,id) {
    const res = await client.db("location").collection("penalite").deleteOne({"_id":id});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}