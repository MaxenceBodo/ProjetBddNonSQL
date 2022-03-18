const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://angela:1234@location.juee0.mongodb.net/location?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertPersonnesPhysiques(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

insert().catch(console.dir);


async function insertPersonnesPhysiques(client) {
    await createManyPersonnesPhysiques(client, [{
            nom: "Bodo",
            prenom: "Maxence",
            sexe: "M",
            age: 25,
            email: "bodo@gmail.com",
            adresse: {
                voie: "Rue abc",
                numero: 20,
                ville: "Villejuif",
                pays: "France",
                adresseComplementaire: ""
            }
        },
            {
                nom: "Coutanceau",
                prenom: "Fabien",
                sexe: "M",
                age: 23,
                email: "fabien@gmail.com",
                adresse: {
                    voie: "Rue abc",
                    numero: 13,
                    ville: "Paris",
                    pays: "France",
                    adresseComplementaire: ""
                }
            },
            {
                nom: "Joti",
                prenom: "Anxhela",
                sexe: "F",
                age: 23,
                email: "joti@gmail.com",
                adresse: {
                    voie: "Rue abc",
                    numero: 23,
                    ville: "Clichy",
                    pays: "France",
                    adresseComplementaire: ""
                }
            }]
    );

}


async function createManyPersonnesPhysiquesPhysiques(client, valeur) {
    const result = await client.db("location").collection("personnes").insertMany(valeur);
    console.log(`Inserted persons ${result.insertedId}`);

}

async function createPersonne(client, valeur) {
    const result = await client.db("location").collection("personnes").insertOne(valeur);
    console.log(`La personne est inserée avec l'id: ${result.insertedId}`);
}