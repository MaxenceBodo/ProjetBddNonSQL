//Fonction de recherche par nom
// parametre =>
//  Client : instance de connection a la bdd
//  filtre : filtre a utiliser sous la forme cle:valeur
//  collection : le nom de la collection ou il faut insérer
async function CRUDread(client, filtre, collection) {
    const result = await client.db("location").collection(collection).findOne({ filtre });
    if (result) {
        console.log("Collection trouvee");
        console.log(result);
    } else {
        console.log("Collection non trouvee");
    }
}