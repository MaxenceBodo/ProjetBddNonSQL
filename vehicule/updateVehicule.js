const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const getVehicule = require("./readVehicule.js");

const db = client.db('location').collection('vehicule');

async function Update() {
    try {
        await client.connect();
        // await updateById({kilometrage: 76524}, {kilometrage: 76530});
        await changeStatusVehicule(1);

    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

Update().catch(console.dir);

async function updateById(filtre, updatedDoc) {
    const res = await db.updateOne(filtre, {$set: updatedDoc});

    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}

async function changeStatusVehicule(id) {
    const etat = await getVehicule.getEtatVehicule(client, id);
    console.log(etat);

    if (etat.etatVehicule === "non loue") await setStatusVehiculeLoue(id);
    else await setStatusVehiculeNonLoue(id);

    console.log(etat.etatVehicule);

}

async function setStatusVehiculeLoue(id) {
    let res = await db.updateOne({"_id": id}, {$set: {"etatVehicule": "loue"}});
    console.log(`${res.modifiedCount} mis a jour`);
}

async function setStatusVehiculeNonLoue(id) {
    let res = await db.updateOne({"_id": id}, {$set: {"etatVehicule": "non loue"}});
    console.log(`${res.modifiedCount} mis a jour`);
}