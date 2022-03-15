const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<userName>:<password>@host/location?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db('location');
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir)
