const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les marques");
        await FindAll(client);
        
        console.log("___________________________________________________________")

        console.log("Affiche une marque");
        await findByMarque(client, "BMW");


    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);


async function FindAll(client) {
    const rx = await client.db('location').collection('marque').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByMarque(client, marque){
    const res = await client.db('location').collection("marque").find({"nom":marque});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}
