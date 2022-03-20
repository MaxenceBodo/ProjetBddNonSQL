const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les penalites");
        await FindAll(client);
        
        console.log("___________________________________________________________")

        console.log("Affiche une penalite");
        await findById(client, 1);


    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);


async function FindAll(client) {
    const rx = await client.db('location').collection('penalite').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findById(client, id){
    const res = await client.db('location').collection("penalite").find({"_id":1});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}
