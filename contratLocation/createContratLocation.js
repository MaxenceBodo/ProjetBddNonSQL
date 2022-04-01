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
                _id: 1,
                dateDebut: new Date("2022-01-01").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-04-01").toISOString(),
                montantAPayer: 5000,
                personne: {
                    idPersonne: 1,
                    typePersonne: "morale"
                },
                agence: 3,
                vehicule: {
                    "SUV": [10, 12, 17, 19],
                    "voiture": [],
                    "fourgonettes": []
                },
                penalite: [],
                clauseLocation: "Texte tres long"
            }, {
                _id: 2,
                dateDebut: new Date("2021-09-13").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2021-09-15").toISOString(),
                montantAPayer: 5000,
                personne: {
                    idPersonne: 2,
                    typePersonne: "morale"
                },
                agence: 3,
                vehicule: {
                    "SUV": [45],
                    "voiture": [68],
                    "fourgonettes": []
                },
                penalite: [],
                clauseLocation: "Texte tres long"
            }, {
                _id: 3,
                dateDebut: new Date("2022-01-13").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-02-23").toISOString(),
                montantAPayer: 5000,
                personne: {
                    idPersonne: 1,
                    typePersonne: "physique"
                },
                agence: 1,
                vehicule: {
                    "SUV": [32],
                    "voiture": [67],
                    "fourgonettes": []
                },
                penalite: [],
                clauseLocation: "Texte tres long"
            }, {
                _id: 4,
                dateDebut: new Date("2019-02-23").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2019-02-28").toISOString(),
                montantAPayer: 5000,
                personne: {
                    idPersonne: 1,
                    typePersonne: "physique"
                },
                agence: 4,
                vehicule: {
                    "SUV": [],
                    "voiture": [79, 80],
                    "fourgonettes": []
                },
                penalite: [],
                clauseLocation: "Texte tres long"
            }, {
                _id: 5,
                dateDebut: new Date("2022-02-22").toISOString(), //YYYY-mm-dd
                dateFin: new Date("2022-02-23").toISOString(),
                montantAPayer: 5000,
                personne: {
                    idPersonne: 3,
                    typePersonne: "physique"
                },
                agence: 2,
                vehicule: {
                    "SUV": [],
                    "voiture": [81, 82, 83, 84, 85],
                    "fourgonettes": [252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263]
                },
                penalite: [1],
                clauseLocation: "Texte tres long"
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
    console.log(`Le contrats a été inséré`);

}

async function getTheMontantAPayer(dateDebut, dateFin, idVehicule) {

}

async function getPrixJourVehicule(idVehicule) {


}

module.exports = {insertContratLocation}