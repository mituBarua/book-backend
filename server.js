require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.xc || 4000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://bookStore:nvycFptQc4aSHpx3@cluster0.fsd1c.mongodb.net/`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("bookStore");
    const bookCollection = db.collection("book");

    app.get("/books", async (req, res) => {
      const cursor = bookCollection.find({});
      const book = await cursor.toArray();
      res.send({ status: true, data: book });
    });

    app.post("/book", async (req, res) => {
      const book = req.body;

      const result = await bookCollection.insertOne(book);

      res.send(result);
    });

    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;

      const result = await bookCollection.findOne({ _id: ObjectId(id) });

      res.send(result);
    });
    app.put("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBook = req.body;
    

      const result = await bookCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedBook }
      );

      res.send(result);
    });

    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;

      const result = await bookCollection.deleteOne({ _id: ObjectId(id) });

      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
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
