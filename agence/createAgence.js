const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insert() {
    try {
        await client.connect();
        await insertSociete(client);

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

insert().catch(console.dir);

async function insertSociete(client){
    await createSociete(client,[{
        _id:1,
        représentant:{
            nom:"Robert",
            prenom:"California",
            tel:"0612714845"
        },
        adresse:{
            voie:"Avenue des papillons",
            numero:41,
            ville:"Rungis",
            pays:"France",
            adresseComplementaire:""
        }
    },{
        _id:2,
        représentant:{
            nom:"Mickael",
            prenom:"Scott",
            tel:"0645126354"
        },
        adresse:{
            voie:"place des genéraux",
            numero:13,
            ville:"Londre",
            pays:"Royaume-Uni",
            adresseComplementaire:""
        }
    },{
        _id:3,
        représentant:{
            nom:"Jimm",
            prenom:"Halper",
            tel:"0612214845"
        },
        adresse:{
            voie:"Rue des étoiles",
            numero:31,
            ville:"Rungis",
            ville:"saint père en retz",
            pays:"France",
            adresseComplementaire:"Etage 4"
        }
    },{
        _id:4,
        représentant:{
            nom:"Schrute ",
            prenom:"Dwight",
            tel:"0612710245"
        },
        adresse:{
            voie:"Avenue des grand hommes",
            numero:10,
            ville:"Houilles",
            pays:"France",
            adresseComplementaire:""
        }
    }])
}

async function createSociete(client, valeur) {
    const result = await client.db("location").collection("agence").insertMany(valeur);
    console.log(`L'agence est inserée avec l'id: ${result.insertedId}`);
}
