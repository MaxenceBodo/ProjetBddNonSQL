const db = client.db("location");
const contrat = db.collection("contratLocation");
const penalite = db.collection("Penalite");

const pipeline1 = [
    {
        $group:
        {
            $count:"facturation"
        }
    }
    
]

const pipeline1 = [
    {
        $group:
        {
            $count:"sommePenalite"
        }
    }
    
]

const result = contrat.aggregate(pipeline1) + penalite.aggregate(pipeline2);