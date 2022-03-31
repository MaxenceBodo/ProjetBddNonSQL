const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const insert = require('./contratLocation/createContratCreation');


async function main() {

    try {
        // Connexion à mongoDBe
        await client.connect();

        //essaie des scripts
        await ajoutVoiture(client);


    } finally {
        // Fermeture de la connexion à mongoDB
        await client.close();
    }
}

main().catch(console.error);

/*
async function profitDeuxDerniersMois(client){
    client.db('location').collection('contratLocation').aggregate([
        {
            $match:{dateFin:{$lte:"2022-01-20"}}
        },
        {$group: {
            _id:"$agence",total:{$sum:"$montantAPayer"}
          }}
    ])
    console.log("Inséré")
}
*/

async function ajoutVoiture(client){
    /*
    _id:2,
    prixJour : 15312,
    anneeMiseEnService:2015,
    kilometrage:102365,
    etatVehicule:"loue",
    marque:1,
    modele:1
    */

    for(let i=0; i<51; i++){
        let ajout = {
            _id:i,
            prixJour : 15000,
            anneMiseEnService:2015,
            kilometrage:10000,
            etatVehicule:"loue",
            marque:1,
            modele:1
        }
        insert.createContratLocations(client,ajout)
    }
}