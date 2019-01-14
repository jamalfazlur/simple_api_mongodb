const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://jamalfazlur:bismillah114@ds253804.mlab.com:53804/tutuplapak';
var port = 1995;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>This API created with Express, MongoDB, and Love</h1>')
})

app.get('/user', (req,res) => {
    MongoClient.connect(url, (err, db) => {
        var userCol = db.collection('users');
        userCol.find({}).toArray((err, docs) => {
            db.close();
            console.log(docs);
            console.log(docs[1].julukan);
            console.log(docs[1]._id);
            res.send(docs);
        })
    })
})
// ===============================================================
app.post('/adduser', (req,res) => {
    console.log(req.body);
    MongoClient.connect(url, (err,db) => {
        var userCol = db.collection('users');
        userCol.insertMany(req.body, (err1, result) => {
            db.close();
            res.send(result);
        })
    })
})
// ===============================================================
app.delete('/deleteuser/:nama', (req,res) => {
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection('users');
        userCol.deleteOne({nama: req.params.nama}, (err1, result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    })
})
// ===============================================================
app.put('/updateuser/:nama', (req,res) => {
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection('users');
        userCol.updateMany({nama: req.params.nama}, {$set: req.body} ,(err1, result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    })
})
// ===============================================================
app.listen(port, () => console.log('http://localhost:' + port ))