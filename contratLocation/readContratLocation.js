const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Read() {
    try {
        await client.connect();
        console.log("Affiche toutes les contrats de locations");
        await FindAll(client);
        
        console.log("___________________________________________________________")

        console.log("Affiche les contrats de location entre deux dates");
        await findByDate(client, "2022-01-01","2022-03-20");


    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

}
Read().catch(console.dir);


async function FindAll(client) {
    const rx = await client.db('location').collection('contratLocation').find();
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function FindAll(client, filtre) {
    const rx = await client.db('location').collection('contratLocation').find(filtre);
    const tax = await rx.toArray();
    tax.forEach((result) => {
        console.log(result);
    });
}

async function findByDate(client,dateDebut, dateFin){
    const res = await client.db('location').collection("contratLocation").find({"dateDebut":{"$gte":dateDebut},"dateFin":{"$lte":dateFin}});
    const arr = await res.toArray();
    arr.forEach((result) => {
        console.log(result);
    });
}
