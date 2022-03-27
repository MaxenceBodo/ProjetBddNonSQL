const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Delete() {
    try {
        await client.connect();
        await deleteByModele(client, "SUV");
    } catch (error) {
        console.log(error)

    } finally {
        client.close()
    }
}
Delete().catch(console.dir);

async function deleteByModele(client,modele) {
    const res = await client.db("location").collection("modele").deleteOne({"nom":modele});
    console.log(res);
    console.log(`${res.deletedCount} document supprimés`);
}