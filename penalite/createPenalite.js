const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
            joursDeRetard:2
        }
    ]
    );

}


async function createPenalite(client, valeur) {
    const result = await client.db("location").collection("penalite").insertMany(valeur);
    console.log(`Penalite inseree`);

}