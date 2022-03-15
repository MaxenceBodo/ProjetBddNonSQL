const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost"
const client = new MongoClient(uri);

async function Updates(){
    try {
       await client.connect();
       await CRUDupdate(client, {type:"Peugeot"}, {type:"Peugeooot"},"Vehicule");
    } catch (error) {
        console.log(error);
    }finally{
        client.close();
    }
}

//Fonction d'update
// parametre =>
//  Client : instance de connection a la bdd
//  filtre : filtre a utiliser sous la forme cle:valeur
//  newData : data à changer sous la forme {type: 'voiture', anneeMiseEnService : 1999}
//  collection : le nom de la collection ou il faut insérer
async function CRUDupdate(client, filtre, newData, collection) {
    const result = await client.db("location").collection(collection)
                        .updateOne({ filtre }, { $set: newData });
    console.log(`${result.matchedCount} le document a ete trouve`);
    console.log(`${result.modifiedCount} le document a ete modifie`);
}