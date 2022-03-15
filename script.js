const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/location";

    const client = new MongoClient(uri);

    try {
        // Connexion à mongoDB
        await client.connect();

        //données
        const societe = [
            {}
        ]

        // Appel à la BDD

    } finally {
        // Fermeture de la connexion à mongoDB
        await client.close();
    }
}

main().catch(console.error);

//Fonction d ajout
// parametre => 
//  Client : instance de connection a la bdd
//  donnée : les données à insérer
//  collection : le nom de la collection ou il faut insérer
async function CRUDcreate(client, donnees, collection){
    const result = await client.db("location").collection(collection).insertMany(donnees);
    console.log(`les donnees ont etes inserees avec l id: ${result.insertedId}`);
}


//Fonction de recherche par nom
// parametre =>
//  Client : instance de connection a la bdd
//  filtre : filtre a utiliser sous la forme cle:valeur
//  collection : le nom de la collection ou il faut insérer
async function CRUDread(client, filtre, collection) {
    const result = await client.db("location").collection(collection).findOne({ filtre });
    if (result) {
        console.log("Collection trouvee");
        console.log(result);
    } else {
        console.log("Collection non trouvee");
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
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

// fonction delete
//  Client : instance de connection a la bdd
//  filtre : filtre a utiliser sous la forme cle:valeur
//  collection : le nom de la collection ou il faut insérer
async function CRUDdelete(client, filtre,collection) {
    const result = await client.db("location").collection(collection)
            .deleteOne({filtre});
    console.log(`${result.deletedCount} le document a ete supprime.`);
}