// fonction delete
//  Client : instance de connection a la bdd
//  filtre : filtre a utiliser sous la forme cle:valeur
//  collection : le nom de la collection ou il faut insérer
async function CRUDdelete(client, filtre,collection) {
    const result = await client.db("location").collection(collection)
            .deleteOne({filtre});
    console.log(`${result.deletedCount} le document a ete supprime.`);
}
