const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const utils = require("./../utils/utils");
const contrat = require("./../contratLocation/readContratLocation");


async function main() {
    try {
        await client.connect();
        await rendreVehicule(client, 1);
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

main().catch(console.dir);

async function rendreVehicule(client, idContrat) {
    let res = await contrat.findById(idContrat);
    console.log(res);

}