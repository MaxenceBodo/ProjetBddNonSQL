const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {

    try {
        // Connexion à mongoDBe
        await client.connect();

        //essaie des scripts
        await profitDeuxDerniersMois(client);


    } finally {
        // Fermeture de la connexion à mongoDB
        await client.close();
    }
}

main().catch(console.error);


async function profitDeuxDerniersMois(client){
    client.db('location').collection('contratLocation').aggregate([
        {
            $match:{dateFin:{$lte:"2022-01-20"}}
        },
        {$group: {
            _id:"$agence",total:{$sum:"$montantAPayer"}
          }}
    ])
    console.log("Inséré")
}