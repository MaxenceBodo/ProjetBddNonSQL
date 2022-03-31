const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertContratLocation(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

insert().catch(console.dir);

async function insertContratLocation(client) {
    await createManyContratLocations(client, [
        {
            _id:1,
            dateDebut:"2022-01-01", //YYYY-mm-dd
            dateFin:"2022-01-14",
            montantAPayer:5000,
            personne:{
                idPersonne:1,
                typePersonne:"morale"
            },
            agence:3,
            vehicule:2,
            penalite:[],
            clauseLocation:"Texte tres long"
        },{
            _id:2,
            dateDebut:"2021-09-13", //YYYY-mm-dd
            dateFin:"2021-09-15",
            montantAPayer:5000,
            personne:{
                idPersonne:2,
                typePersonne:"morale"
            },
            agence:3,
            vehicule:1,
            penalite:[],
            clauseLocation:"Texte tres long"
        },{
            _id:3,
            dateDebut:"2022-01-13", //YYYY-mm-dd
            dateFin:"2022-02-23",
            montantAPayer:5000,
            personne:{
                idPersonne:1,
                typePersonne:"physique"
            },
            agence:1,
            vehicule:1,
            penalite:[],
            clauseLocation:"Texte tres long"
        },{
            _id:4,
            dateDebut:"2019-02-23", //YYYY-mm-dd
            dateFin:"2019-02-28",
            montantAPayer:5000,
            personne:{
                idPersonne:1,
                typePersonne:"physique"
            },
            agence:4,
            vehicule:3,
            penalite:[],
            clauseLocation:"Texte tres long"
        },{
            _id:5,
            dateDebut:"2022-02-22", //YYYY-mm-dd
            dateFin:"2022-02-23",
            montantAPayer:5000,
            personne:{
                idPersonne:3,
                typePersonne:"physique"
            },
            agence:2,
            vehicule:3,
            penalite:[1],
            clauseLocation:"Texte tres long"
        }
    ]
    );
}


async function createManyContratLocations(client, valeur) {
    const result = await client.db("location").collection("contratLocation").insertMany(valeur);
    console.log(`Les contrats ont été insérés`);

}

async function createContratLocations(client, valeur) {
    const result = await client.db("location").collection("contratLocation").insertOne(valeur);
    console.log(`Les contrats ont été insérés`);

}

async function getTheMontantAPayer(dateDebut, dateFin, idVehicule) {

}

async function getPrixJourVehicule(idVehicule) {


}