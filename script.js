const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const createV = require('./Vehicule/createVehicule');
const createA = require('./agence/createAgence');
const createCB = require('./compteBancaire/createCompte');
const createCL  =require('./contratLocation/createContratCreation');
const createMo = require('./modele/createModele');
const createPena = require('./penalite/createPenalite');
const createPersMo = require('./personne/morale/createPersonneMorale');
const createPersoPh = require('./personne/physique/createPersonnePhysique');
const createSociete = require('./societe/createSociete');

async function main() {

    try {
        // Connexion à mongoDBe
        await client.connect();

        //Creation dans la table
        console.log("-----------------------------------------")
        console.log('\n')
        console.log('\n')
        console.log("Creation des tables")

        // await ajoutVehicule(client);
        // await createA.insertAgence(client);
        // await createCB.insertComptesBancaires(client);
        // await createCL.insertContratLocation(client);
        // await createMo.insertModele(client),
        await createPena.insertPenalite(client);
        // await createPersMo.insertPersonnesMorales(client);
        // await createPersoPh.insertPersonnesPhysiques(client);
        // await createSociete.insertSociete(client)

        console.log('\n')
        console.log('\n')
        console.log("-----------------------------------------")


    } catch(error){
        console.log(error)
    }
    finally {
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

async function ajoutVehicule(client){
    let ajout;
    for(let i=1; i<51; i++){
        ajout = {
            _id:i,
            prixJour : entierAleatoire(10000,20000),
            anneMiseEnService:entierAleatoire(2011,2021),
            kilometrage:entierAleatoire(20000,150000),
            etatVehicule:"non loue",
            marque:choixMarque(),
            modele:1
        }
        await createV.createVehiculeOne(client,ajout)
    }
}

function entierAleatoire(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function choixMarque(){
    let marque = ["BMW", "Audi", "Tesla", "Peugeot"]
    return marque[entierAleatoire(0,3)]
}