//Fonction d ajout
// parametre => 
//  Client : instance de connection a la bdd
//  donnée : les données à insérer
//  collection : le nom de la collection ou il faut insérer
async function CRUDcreate(client, donnees, collection){
    const result = await client.db("location").collection(collection).insertMany(donnees);
    console.log(`les donnees ont etes inserees avec l id: ${result.insertedId}`);
}
