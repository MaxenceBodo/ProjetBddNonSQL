const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const createV = require('./vehicule/createVehicule');
const createA = require('./agence/createAgence');
const createCB = require('./compteBancaire/createCompte');
const createCL  =require('./contratLocation/createContratLocation');
const createMo = require('./modele/createModele');
const createPena = require('./penalite/createPenalite');
const createPersMo = require('./personne/morale/createPersonneMorale');
const createPersoPh = require('./personne/physique/createPersonnePhysique');
const createSociete = require('./societe/createSociete');

const deleteV = require('./vehicule/deleteVehicule');
const deleteA = require('./agence/deleteAgence');
const deleteCB = require('./compteBancaire/deleteCompte');
const deleteCL =require('./contratLocation/deleteContratLocation');
const deleteMo = require('./modele/deleteModele');
const deletePena = require('./penalite/deletePenalite');
const deletePersMo = require('./personne/morale/deletePersonneMorale');
const deletePersoPh = require('./personne/physique/deletePersonnePhysique');
const deleteSociete = require('./societe/deleteSociete');

async function main() {

    try {
        // Connexion à mongoDBe
        await client.connect();
        // //Delete toutes les données pour eviter les problèmes lors d'un premier lancement
        console.log("-----------------------------------------")
        console.log("Suppression des tables")
        // await deleteV.deleteAll(client);
        await deleteA.deleteAll(client);
        await deleteCB.deleteAll(client);
        await deleteCL.deleteAll(client);
        await deleteMo.deleteAll(client);
        await deletePena.deleteAll(client);
        await deletePersMo.deleteAll(client);
        await deletePersoPh.deleteAll(client);
        await deleteSociete.deleteAll(client);
        console.log('\n')
        console.log('\n')

        // //Creation dans la table
        console.log("-----------------------------------------")
        console.log("Creation des tables")
        // await ajoutVehicule(client);
        await createA.insertAgence(client);
        await createCB.insertComptesBancaires(client);
        await createCL.insertContratLocation(client);
        await createMo.insertModele(client),
        await createPena.insertPenalite(client);
        await createPersMo.insertPersonnesMorales(client);
        await createPersoPh.insertPersonnesPhysiques(client);
        await createSociete.insertSociete(client)
        console.log('\n')
        console.log('\n')

        console.log("-----------------------------------------")
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

/*
  3. Mettre en place un petit générateur des données pour permettre d'insérer uniquemenet les données des voitures
*/
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

//Sert pour varier les donnes dans les vehicules
function entierAleatoire(min, max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

//Sert a choisir aleatoirement une marque pour une plus grande variete dans vehicule
function choixMarque(){
  let marque = ["BMW", "Audi", "Tesla", "Peugeot"]
  return marque[entierAleatoire(0,3)]
}

/*
  4.En utilisant un Drivers (Au choix, Java ou NodeJS), ecrire les differentes fonctions qui permettent de faire 
  les operations du CRUD sur le loueur, le reservant et sur le contrat de location.
*/
//Voir dossier './agence', './personne' et './contratLocation'


/*
  5. En utilisant les operateurs d’agregations, ecrire des fonctions via des drivers qui permettent de faire les operations ci-apres
*/
//Agregation 1 : Permet aux loueurs de pouvoir calculer ses profits cumul´es sur les deux premiers mois.
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

//Agregation 2 : Permet aux loueurs de pouvoir calculer ses profits cumul´es sur les deux derniers mois.
async function profitDeuxDerniersMois(client){
  console.log(decalageDate(2));
    const test = client.db('location').collection('contratLocation').aggregate([
        {
          '$match': {
            'dateFin': {
              '$lte': decalageDate(2)
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

function decalageDate(decalage){
  let date = new Date();
  date.setMonth(date.getMonth()-decalage);
  return date.toISOString();
}
