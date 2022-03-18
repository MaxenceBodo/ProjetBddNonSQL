const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertPersonnesMorales(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

insert().catch(console.dir);

async function insertPersonnesMorales(client){
    await createManyPersonnes(client,[{
                _id:1,
                SIRET : 44306184100047,
                nomEntreprise :"Google",
                compteEntreprise : "Google",
                email:"google@laposte.fr",
                representantLegal:{
                    nom:"Missoffe",
                    prenom:"Sébastien ",
                    tel:"0612764846"
                },
                adresse:{
                    voie:"Route de st père",
                    numero:6,
                    ville:"Saint Viaud",
                    pays:"France",
                    adresseComplementaire: ""
                }
            },{
                _id:2,
                SIRET : 35012746000284,
                nomEntreprise :"Fnac",
                compteEntreprise : "Fnac",
                email:"Fnac@gmail.com",
                representantLegal:{
                    nom:"Martinez",
                    prenom:"Enrique  ",
                    tel:"0645481365"
                },
                adresse:{
                    voie:"Rue des bateaux",
                    numero:9,
                    ville:"Ivry-sur-Seine",
                    pays:"France",
                    adresseComplementaire: ""
                }
            },{
                _id:3,
                SIRET : 43491253100028,
                nomEntreprise :"La Foir Fouille",
                compteEntreprise : "La Foir Fouille",
                email:"google@laposte.fr",
                representantLegal:{
                    nom:"Lavielle",
                    prenom:"Geoffrey",
                    tel:"0646126784"
                },
                adresse:{
                    voie:"RAvenue Clément Ader",
                    numero:155,
                    ville:"Castelnau-le-Lez",
                    pays:"France",
                    adresseComplementaire: ""
                }
            }
        ]
    )
}

async function createManyPersonnes(client, valeur) {
    const result = await client.db("location").collection("personnesMorales").insertMany(valeur);
    console.log(`Les personnes ont été insérés avec l'ID ${result.insertedId}`);

}

async function createPersonne(client, valeur) {
    const result = await client.db("location").collection("personnesMorales").insertOne(valeur);
    console.log(`La personne est inserée avec l'id: ${result.insertedId}`);
}
