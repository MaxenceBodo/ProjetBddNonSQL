const db = client.db("location");
const contrat = db.collection("contratLocation");

const pipeline = [
    {
        $match:
        {
            dateDebut:{$lte : }
        }
    },
    {
        $count:"facturation"
    }
    
]

const result = contrat.aggregate(pipeline);