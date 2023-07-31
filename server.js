require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.xc || 4000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://pcBuilder:Ude317x0vqoXcUJD@cluster0.fsd1c.mongodb.net/`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("pcBuilder");
    const pcBuilder = db.collection("featuredProduct");

    app.get("/featured-product", async (req, res) => {
      const cursor = pcBuilder.find({});
      const featuredProduct = await cursor.toArray();
      res.send({ status: true, data: featuredProduct });
    });
    app.get("/featured-product/:id", async (req, res) => {
      const id = req.params.id;

      const result = await pcBuilder.findOne({ _id: ObjectId(id) });

      res.send(result);
    });
  } finally {
  }
  try {
    const db = client.db("pcBuilder");
    const pcBuilder2 = db.collection("featuredCategory");

    app.get("/featured-category", async (req, res) => {
      const cursor = pcBuilder2.find({});
      const featuredCategory = await cursor.toArray();
      res.send({ status: true, data: featuredCategory });
    });
    app.get("/featured-category/:id", async (req, res) => {
      const id = req.params.id;

      const result = await pcBuilder2.findOne({ _id: ObjectId(id) });

      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
