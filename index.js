const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoclient = mongodb.MongoClient;
const app = express();
require("dotenv").config();

const URLL = process.env.URL;
app.use(express.json());

app.use(
  cors({
    orgin: "http://localhost:3000",
  })
);

//for creating mentors

app.get("/mentors", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("mentors");

    const operation = await collection.find({}).toArray();

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.post("/mentor", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("mentors");

    const operation = await collection.insertOne(req.body);

    await connection.close();

    res.json({ message: "user added" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.put("/mentor/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("mentors");

    const operation = await collection.findOneAndUpdate(
      { _id: mongodb.ObjectId(req.params.id) },
      { $set: req.body }
    );

    await connection.close();

    res.json({ message: "edited" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.delete("/mentor/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("mentors");

    const operation = await collection.deleteOne({
      _id: mongodb.ObjectId(req.params.id),
    });

    await connection.close();

    res.json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.get("/mentor/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("mentors");

    const operation = await collection.findOne({
      _id: mongodb.ObjectId(req.params.id),
    });
    console.log(req.params.id);

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

//students api

app.get("/students", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.find({}).toArray();

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.post("/student", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.insertOne(req.body);

    await connection.close();

    res.json({ message: "user added" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.findOneAndUpdate(
      { _id: mongodb.ObjectId(req.params.id) },
      { $set: req.body }
    );

    await connection.close();

    res.json({ message: "edited" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.deleteOne({
      _id: mongodb.ObjectId(req.params.id),
    });

    await connection.close();

    res.json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.findOne({
      _id: mongodb.ObjectId(req.params.id),
    });

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.get("/managestudents/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection
      .find({
        mentorid: req.params.id,
      })
      .toArray();

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.get("/studentslist/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.find({ mentorid: "" }).toArray();

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.put("/assignstudents/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.findOneAndUpdate({
      mentorid: req.params.id,
    });

    await connection.close();

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.put("/unassign/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URLL);

    const db = connection.db("testing");

    const collection = db.collection("students");

    const operation = await collection.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    await connection.close();

    res.json({ message: "edited" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${port}`);
});
