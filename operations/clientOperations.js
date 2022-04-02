const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const utils = require("./../utils/utils");
const contrat = require("./../contratLocation/readContratLocation");
const vehicule = require("./../vehicule/updateVehicule");
const penalite = require("./../penalite/createPenalite");

const TVA = 0.2;

async function main() {
    try {
        await client.connect();
        await rendreVehicule(client, 2);
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

main().catch(console.dir);

async function rendreVehicule(client, idContrat) {
    let resContrat = await contrat.findById(idContrat);

    // await checkForPenalites(idContrat);
    // await changeVehiculeStatus(res.vehicule.SUV);
    // await changeVehiculeStatus(res.vehicule.voiture);
    // await changeVehiculeStatus(res.vehicule.fourgonettes);

    // console.log(res);
    let joursDeRetard = await joursDePenalite(idContrat);
    if (joursDeRetard !== 0) {
        let penaliteData = {
            sommePenalite: await calculerPenalite(resContrat, joursDeRetard),
            joursDeRetard: joursDeRetard,
            idContrat: idContrat
        };
        await penalite.createOnePenalite(client, penaliteData);
    }
}

async function changeVehiculeStatus(vehicules) {
    vehicules.forEach((idVehicule) => {
        vehicule.changeStatusVehicule(idVehicule);
    })
}

async function joursDePenalite(idContrat) {
    let res = await client.db("location").collection("contratLocation").findOne({
        "_id": idContrat,
        "dateFin": {"$lt": new Date().toISOString()}
    });
    // console.log(res);
    if (res !== null)
        return utils.getDaysDifferenceFromToday(res.dateFin);

    return 0;
}

//PENALITE = JOURS DE RETARD * TVA DU VEHICULE (pour chaque vehicule)
async function calculerPenalite(contrat, joursDeRetard) {
    const test = client.db('location').collection('contratLocation').aggregate([
        {
            '$match': {
                '_id': contrat._id
            }
        },

        {
            '$lookup': {
                from: "vehicule",
                localField: "vehicule.SUV",
                foreignField: "_id",
                as: "vehicules_loues1"
            },

        },
        {
            '$lookup': {
                from: "vehicule",
                localField: "vehicule.voiture",
                foreignField: "_id",
                as: "vehicules_loues2"
            },
        },
        {
            '$lookup': {
                from: "vehicule",
                localField: "vehicule.fourgonettes",
                foreignField: "_id",
                as: "vehicules_loues3"
            },

        },
        {
            '$project': {
                vehicules_loues: {
                    $concatArrays: ["$vehicules_loues1", "$vehicules_loues2", "$vehicules_loues3"]
                }
            }
        },
        {'$unwind': '$vehicules_loues'},
        //////////////////////////////////////////
        {
            '$group': {
                "_id": 0,
                'total': {
                    '$sum':
                        {'$multiply': ['$vehicules_loues.modele.prixJour', TVA, joursDeRetard]}     //20% TVA
                }
            }
        }
    ]);

    let res;
    for await(const doc of test) {
        res = doc.total;
    }
    return Math.floor(res);

}

//TODO: LOUERVEHICULE FUNCTION



