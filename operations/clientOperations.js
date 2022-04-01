const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://sorbonne:1234@location.2tudd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const utils = require("./../utils/utils");
const contrat = require("./../contratLocation/readContratLocation");
const vehicule = require("./../vehicule/updateVehicule");

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
    let res = await contrat.findById(idContrat);

    await checkForPenalites(idContrat);
    // await changeVehiculeStatus(res.vehicule.SUV);
    // await changeVehiculeStatus(res.vehicule.voiture);
    // await changeVehiculeStatus(res.vehicule.fourgonettes);

    // console.log(res);

}

async function changeVehiculeStatus(vehicules) {
    vehicules.forEach((idVehicule) => {
        vehicule.changeStatusVehicule(idVehicule);
    })
}

async function checkForPenalites(idContrat) {
    let res = await client.db("location").collection("contratLocation").findOne({
        "_id": idContrat,
        "dateFin": {"$lt": new Date().toISOString()}
    });
    // console.log(res);
    //res === null
    await calculerPenalite(res);
}

async function calculerPenalite(contrat) {
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
        //////////////////////////////////////////
        // {
        //     '$project': {
        //         'total': {
        //             '$sum': '$vehicules_loues.prixJour'
        //         }
        //     }
        // }
        {
            '$lookup': {
                from: "modele",
                localField: "vehicules_loues.modele",
                foreignField: "_id",
                as: "modeles"
            }
        },

    ]);
    for await(const doc of test) {
        console.log(doc);
    }


}



