const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
            _id:2,
            dateDebut:"2022-01-13", //YYYY-mm-dd
            dateFin:"2022-02-23",
            personne:{
                idPersonne:1,
                typePersonne:"morale"
            },
            agence:3,
            vehicule:2,
            penalite:[1]
        }
    ]
    );
}


async function createManyContratLocations(client, valeur) {
    const result = await client.db("location").collection("contratLocation").insertMany(valeur);
    console.log(`Les contrats ont été insérés`);

}