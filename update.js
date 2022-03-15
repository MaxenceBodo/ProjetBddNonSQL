//Fonction d'update
// parametre =>
//  Client : instance de connection a la bdd
//  filtre : filtre a utiliser sous la forme cle:valeur
//  newData : data à changer sous la forme {type: 'voiture', anneeMiseEnService : 1999}
//  collection : le nom de la collection ou il faut insérer
async function CRUDupdate(client, filtre, newData, collection) {
    const result = await client.db("location").collection(collection)
                        .updateOne({ filtre }, { $set: newData });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}