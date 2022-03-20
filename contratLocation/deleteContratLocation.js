const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteByFilre(client, {_id:1});
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}
Delete().catch(console.dir);

async function deleteByFilre(client,filtre) {
    const res = await client.db("location").collection("contratLocation").deleteOne(filtre);
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}