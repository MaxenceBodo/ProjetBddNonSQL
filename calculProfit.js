const db = client.db("location");
const contrat = db.collection("contratLocation");

const pipeline = [
    {
        $group:
        {
            $count:"facturation"
        }
    }
    
]

const result = contrat.aggregate(pipeline);