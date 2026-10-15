var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());

let lessonsArray = [
    {
        id: 1001,
        subject: "Computer Science",
        teacher: "Mark Jones",
        location: "Hendon",
        price: 25,
        availability: 5,
        image: "computerScience.jpg",
        alt: "A picture representing Computer Science"
    },
    {
        id: 1002,
        subject: "Mathematics",
        teacher: "Sarah Smith",
        location: "Hendon",
        price: 20,
        availability: 5,
        image: "maths.jpg",
        alt: "A picture representing Mathematics"
    },
    {
        id: 1003,
        subject: "English Literature",
        teacher: "John Doe",
        location: "Hendon",
        price: 18,
        availability: 5,
        image: "englishLiterature.jpg",
        alt: "A picture representing English Literature"
    }
];

app.use(function(request, response) {
    console.log("In comes a request to: " + request.url);
    response.json(lessonsArray);
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});