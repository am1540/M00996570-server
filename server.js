var express = require("express");
var cors = require("cors");
var path = require("path");

require("dotenv").config({ path: "./config.env" });

var app = express();

app.use(cors());
app.use(express.json());

app.use(function(request, response, next) {
    console.log("Incoming " + request.method + " request to " + request.url);
    next();
});

var publicPath = path.resolve(__dirname, "staticFiles");
app.use("/images", express.static(publicPath));

const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_PREFIX +
            process.env.MONGODB_USERNAME + ":" +
            process.env.MONGODB_PASSWORD +
            process.env.MONGODB_URL;

const client = new MongoClient(uri);
let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db("AfterSchoolClub");
        console.log("You successfully connected to MongoDB Atlas!");
    } catch (err) {
        console.dir(err);
    }
}
connectToMongoDB();

app.get("/lessons", async function(request, response) {
    try {
        let collection = db.collection("lessons");
        let results = await collection.find({}).toArray();
        response.send(results);
    } catch (err) {
        response.status(500).send("Error fetching lessons from database");
    }
});

app.post("/orders", async function(request, response) {
    try {
        var body = request.body;
        let collection = db.collection("orders");
        let result = await collection.insertOne(body);
        console.log("Order received from: " + body.name);
        response.send(result);
    } catch (err) {
        response.status(500).send("Error saving order to database");
    }
});

app.put("/lessons/:_id", async function(request, response) {
    try {
        let collection = db.collection("lessons");
        let tempid = request.params._id;
        const query = { _id: new ObjectId(tempid) };
        const updates = {
            $set: request.body
        };
        let result = await collection.updateOne(query, updates);
        response.send(result);
        console.log("Lesson updated:", result);
    } catch (err) {
        response.status(500).send("Error updating lesson in database");
    }
});

app.use(function(request, response) {
    response.status(404).send("Page not found!");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("App started on port " + port);
});