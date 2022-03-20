const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://maxence:1234@location.g3zdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {

    try {
        // Connexion à mongoDBe
        await client.connect();

        //essaie des scripts
        profitDeuxDernirsMois(client);


    } finally {
        // Fermeture de la connexion à mongoDB
        await client.close();
    }
}

main().catch(console.error);

async function profitContraDeLocation(){
    
}
async function profitDeuxDernirsMois(client){
    clientdb('location').collection('contratDeLocation').agregate({
        "$group":{
            _id
        }
    })
}