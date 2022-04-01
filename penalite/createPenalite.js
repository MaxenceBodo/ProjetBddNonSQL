const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        // await insertPenalite(client);
        await checkForPenalites(client);
        // await isVoitureLoue(client, 1);
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
                _id: 1,
                sommePenalite: 5000,
                joursDeRetard: 2
            },
            {
                _id: 2,
                sommePenalite: 1000,
                joursDeRetard: 1
            }
        ]
    );

}


async function createPenalite(client, valeur) {
    const result = await client.db("location").collection("penalite").insertMany(valeur);
    console.log(`Penalite inseree`);

}


async function checkForPenalites(client) {
    const res = await client.db("location").collection("contratLocation").find({"dateFin": {"$lt": new Date().toISOString()}});
    const tax = await res.toArray();
    for (const result of tax) {
        // console.log(result.vehicule);
        for (let i = 0; i < result.vehicule.SUV.length; i++) {
            // console.log(result.vehicule.SUV[i]);
            const suvResult = await client.db("location").collection("vehicule").findOne({"_id": result.vehicule.SUV[i]});
            console.log(suvResult);
        }
    }


}

async function isVoitureLoue(client, idVoiture) {
    const test = client.db('location').collection('vehicule').aggregate([
        {
            '$match': {
                'modele': 2
            }
        }, {
            '$group': {
                '_id': '$etatVehicule'
            }
        }
    ]);
    for await (let doc of test) {
        console.log(doc);
    }
}

module.exports = {insertPenalite};