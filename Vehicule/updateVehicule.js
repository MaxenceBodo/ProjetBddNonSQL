const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const getVehicule = require("./readVehicule.js");

const db = client.db('location').collection('vehicule');

async function Update() {
    try {
        await client.connect();
        // await updateById({kilometrage: 76524}, {kilometrage: 76530});

        // ========================================================
        //UNFINISHED
        // await getVehicule.getEtatVehicule(,1);
        // console.log(res1);

        //============================================================
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

async function setStatusVehiculeLoue(id) {
    let res = await db.updateOne({"_id": id}, {"etatVehicule": "loue"});

    console.log(`${res.matchedCount} documents trouves`);
    console.log(`${res.modifiedCount} mis a jour`);
}