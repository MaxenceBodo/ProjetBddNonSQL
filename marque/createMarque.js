const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertMarque(client);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

insert().catch(console.dir);

async function insertMarque(client) {
    await createMarque(client, [
        {
            _id: 1,
            nom: "BMW",
            coeff: 2
        }, {
            _id: 2,
            nom: "audi",
            coeff: 3
        }, {
            _id: 3,
            nom: "peugeot",
            coeff: 1
        }, {
            _id: 4,
            nom: "renaud",
            coeff: 1
        },
        {
            _id: 5,
            nom: "lamborghini",
            coeff: 5
        }
    ])
}

async function createMarque(client, valeur) {
    const result = await client.db("location").collection("marque").insertMany(valeur);
    console.log(`Les marques ont été inserés ${result.insertedIds}`);
}
