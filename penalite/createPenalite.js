const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertPenalite(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

insert().catch(console.dir);


async function insertPenalite(client) {
    await createPenalite(client, [
        {
            _id:1,
            sommePenalite:5000,
            joursDeRetars:2
        }
    ]
    );

}


async function createPenalite(client, valeur) {
    const result = await client.db("location").collection("penalite").insertMany(valeur);
    console.log(`Penalite inseree`);

}