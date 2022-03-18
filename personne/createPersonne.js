const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/location?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function Inserer(){
    try {
        await client.connect();
        await CRUDcreate(client,{

        },"Vehicule")

    } catch (error) {
        console.error(error);
    }
    finally{
        client.close();
    }
}


//Fonction d ajout
// parametre => 
//  client : instance de connection a la bdd
//  donnée : les données à insérer
//  collection : le nom de la collection ou il faut insérer
async function createPersonne(client, valeur){
    const result = await client.db("location").collection(collection).insertMany(donnees);
    console.log(`les donnees ont etes inserees avec l id: ${result.insertedId}`);
}
