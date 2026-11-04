var express = require("express");
var cors = require("cors");
var path = require("path");

var app = express();

app.use(cors());
app.use(express.json());

app.use(function(request, response, next) {
    console.log("Incoming " + request.method + " request to " + request.url);
    next();
});

var publicPath = path.resolve(__dirname, "staticFiles");
app.use("/images", express.static(publicPath));

let lessonsArray = [
    {
        id: 1001,
        subject: "Computer Science",
        teacher: "Mark Jones",
        location: "Hendon",
        price: 25,
        availability: 5,
        image: "computerScience.jpg",
        alt: "Computer Science"
    },
    {
        id: 1002,
        subject: "Mathematics",
        teacher: "Sarah Smith",
        location: "Hendon",
        price: 20,
        availability: 5,
        image: "maths.jpg",
        alt: "Mathematics"
    },
    {
        id: 1003,
        subject: "English Literature",
        teacher: "John Doe",
        location: "Hendon",
        price: 18,
        availability: 5,
        image: "englishLiterature.jpg",
        alt: "English Literature"
    }
];

app.get("/lessons", function(request, response) {
    response.json(lessonsArray);
});

app.post("/orders", function(request, response) {
    var body = request.body;
    console.log("Order received from: " + body.name);
    response.json({ message: "Order received!" });
});

app.use(function(request, response) {
    response.status(404).send("Page not found!");
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});