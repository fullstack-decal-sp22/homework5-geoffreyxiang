const express = require('express');
const req = require('express/lib/request');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded())

const mongoose = require('mongoose');

const db = mongoose.connection;
const url = "mongodb://127.0.0.1:27017/apod";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const Schema = mongoose.Schema;
const apodSchema = Schema({
    title: {
        type: String,
        required: true
    }, 
    url: {
        type: String, 
        required: true
    }, 
    rating: {
        type: Number, 
        required: true
    }
}, {collection: 'images'})

const APOD = mongoose.model('APOD', apodSchema);

// CODE GOES HERE

app.get("/", function (req, res) {
    APOD.find().then((apod) => {
        res.json({images: apod})
    })
})

app.get("/favorite", function(req, res) {
    APOD.find().sort({'rating': 'desc'}).exec((error, images) => {
        if (error) {
            console.log(error);
            res.send(500);
        }
        else {
            res.json({favorite: images[0]})
        }
    })
})

app.post("/add", (req, res) => {
    const apod = new APOD({
        title: req.body.title,
        url: req.body.url,
        rating: req.body.rating
    })
    apod.save((error, document) => {
        if (error) {
            res.json({ title: 'failure to add' })
        }
        else {
            res.json({title: req.body.title})
        }
    })
}) 

app.delete("/delete", function(req, res) {
    APOD.findOneAndDelete({title: req.body.title}, (error, apodSchema) => {
        if (error) {
            res.json({status: 'failure'});
        } 
        else {
            res.json({status: 'success'});
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
