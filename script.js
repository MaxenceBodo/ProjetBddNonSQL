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
        // console.log("-----------------------------------------")
        // console.log('\n')
        // console.log('\n')
        // console.log("Creation des tables")

        // await ajoutVehicule(client);
        // await createA.insertAgence(client);
        // await createCB.insertComptesBancaires(client);
        // await createCL.insertContratLocation(client);
        // await createMo.insertModele(client),
        // await createPena.insertPenalite(client);
        // await createPersMo.insertPersonnesMorales(client);
        // await createPersoPh.insertPersonnesPhysiques(client);
        // await createSociete.insertSociete(client)

        // console.log('\n')
        // console.log('\n')
        // console.log("-----------------------------------------")

        console.log("Fonction agregation")

        console.log("Deux premiers mois");
        await profitDeuxPremiersMois(client);

        console.log("Deux derniers mois");
        await profitDeuxDerniersMois(client);

    } catch(error){
        console.log(error)
    }
    finally {
        // Fermeture de la connexion à mongoDB
        await client.close();
    }
}

main().catch(console.error);

async function profitDeuxPremiersMois(client){
    const test = client.db('location').collection('contratLocation').aggregate([
        {
          '$match': {
            'dateFin': {
              '$gte': '2021-10-01', 
              '$lte': '2021-11-31'
            }
          }
        }, {
          '$group': {
            '_id': 0, 
            'total': {
                '$sum': '$montantAPayer'
            }
          }
        }
      ])
    for await(const doc of test){
        console.log(doc);
    }
}

//Permet d'avoir la date du jour -2 mois
let date = new Date();
(date.setMonth(date.getMonth()-2));
let dateInput = date.toLocaleDateString();

async function profitDeuxDerniersMois(client){
  console.log(dateInput);
    const test = client.db('location').collection('contratLocation').aggregate([
        {
          '$match': {
            'dateFin': {
              '$lte': dateInput
            }
          }
        }, {
          '$group': {
            '_id': 0, 
            'total': {
                '$sum': '$montantAPayer'
            }
          }
        }
      ])
      for await(const doc of test){
        console.log(doc);
    }
    // console.log("Inséré")
}


async function ajoutVehicule(client){
    let ajout;
    //Ajout SUV
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

    //Ajout voiture
    for(let i=51; i<251; i++){
        ajout = {
            _id:i,
            prixJour : entierAleatoire(10000,20000),
            anneMiseEnService:entierAleatoire(2011,2021),
            kilometrage:entierAleatoire(20000,150000),
            etatVehicule:"non loue",
            marque:choixMarque(),
            modele:2
        }
        await createV.createVehiculeOne(client,ajout)
    }

    //Ajout Fourgonette
    for(let i=251; i<271; i++){
        ajout = {
            _id:i,
            prixJour : entierAleatoire(10000,20000),
            anneMiseEnService:entierAleatoire(2011,2021),
            kilometrage:entierAleatoire(20000,150000),
            etatVehicule:"non loue",
            marque:choixMarque(),
            modele:3
        }
        await createV.createVehiculeOne(client,ajout)
    }
}

//calcul penalite => 20% du montant + TVA 
async function calculerPenalite(client){
    
}

// calculer prendre total prix + penalite retard (fonction précédente je pense)
async function calculerDepenseEntreprise(client){

}

//Sert pour varier les donnes dans les vehicules
function entierAleatoire(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

//Sert a choisir aleatoirement une marque pour une plus grande variete dans 
//vehicule
function choixMarque(){
    let marque = ["BMW", "Audi", "Tesla", "Peugeot"]
    return marque[entierAleatoire(0,3)]
}