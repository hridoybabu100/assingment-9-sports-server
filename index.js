const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dns = require('node:dns').promises;
dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT || 5000

// / Adds headers: Access-Control-Allow-Origin: *
app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://SportsManagement:74nAeGsaRe9FkSvB@cluster0.gkrxgec.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const db = client.db("SportsManagement");
    const sportCollection = db.collection("sportCollection");
    //Sports Details
    app.get("/sports/:id", async(req, res) => {
      const {id} = req.params
      const query = {_id : new ObjectId(id)}
      const result = await sportCollection.findOne(query)
      res.send(result);
    })

    //Api Get
    app.get("/sports", async(req, res) => {
      const cursor = sportCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    //Post
    app.post("/sports", async(req, res) => {
      const postData = req.body
      const result = await sportCollection.insertOne(postData);
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Assingment-9-all-sports!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
