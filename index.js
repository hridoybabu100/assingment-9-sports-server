const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dns = require("node:dns").promises;
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
dotenv.config();
const port = process.env.PORT || 5000;

// / Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());

const uri = process.env.SERVER_URI_LINK;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const jwt = createRemoteJWKSet(new URL("http://localhost:3000/api/auth/jwks"));

const verifyToken = async (req, res, next) => {
  const header = req?.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorize" });
  }
  // console.log(header);
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorize" });
  }
  // console.log(token);
  try {
    const { payload } = await jwtVerify(token, jwt);
    console.log(payload);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Found" });
  }
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("SportsManagement");
    const sportCollection = db.collection("sportCollection");
    const purchaseCollection = db.collection("Purchase");

    //Purchase API Post
    app.post("/purchase", verifyToken, async (req, res) => {
      const purChaseData = req.body;
      const result = await purchaseCollection.insertOne(purChaseData);
      res.send(result);
    });
    // purchase API
    app.get("/purchase/:userId",  async (req, res) => {
      const { userId } = req.params;
      const result = await purchaseCollection.find({ userId }).toArray();
      res.send(result);
    });
    //purchase API delete
    app.delete("/purchase/:purchaseId", verifyToken,  async (req, res) => {
      const { purchaseId } = req.params;
      const result = await purchaseCollection.deleteOne({
        _id: new ObjectId(purchaseId),
      });
      res.send(result);
    });

    // Delete
    app.delete("/sports/:id", async (req, res) => {
      const { id } = req.params;
      const result = await sportCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // patch Updated
    app.patch("/sports/:id", async (req, res) => {
      const { id } = req.params;
      const updateData = req.body;
      const result = await sportCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
      );
      res.send(result);
    });
    //Sports Details
    app.get("/sports/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await sportCollection.findOne(query);
      res.send(result);
    });

    //Api Get
    app.get("/sports", async (req, res) => {
      const cursor = sportCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //Post
    app.post("/sports",  async(req, res) => {
      const postData = req.body;
      const result = await sportCollection.insertOne(postData);
      res.send(result);
    });

    // players
    app.get("/sports",  async (req, res) => {
      const result = await sportCollection.find(4).limit().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Assingment-9-all-sports!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
