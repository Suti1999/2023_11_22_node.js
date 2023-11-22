const express = require('express');
const app = express(); //-- http szervert tudunk vele indítani --//
const bodyParser = require('body-parser');
//-- Az átirányítás miatt használjuk a cors-t --//
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//-- Az adatbázis elérés miatt felel  --//
const mysql = require('mysql');
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
})
database.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
});
app.get ('/', (req, res) => { 
    res.send("Hello World!");
});//-- Anonym függvény --//
app.get ('/bela', (req, res) => { 
    res.send("Ez Béla lapja");
});
app.get ('/bela/:id', (req, res) => {
    let id = req.params.id; 
    res.send(`Ez Béla lapja, id: ${id}`);
});
app.get ('/bela/:id/:nev', (req, res) => {
    let id = req.params.id; 
    let nev = req.params.nev; 
    res.send(`Ez Béla lapja, id: ${id}, nev: ${nev}`);
});
app.post ('/bela', (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    res.send(`Ez Bélja lapja POST, id: ${id}, name: ${name}`);
})
app.get ('/ugyfel', (req, res) => {
    let slqcommand =`SELECT * FROM ugyfel`;
    database.query(sqlcommand, (err, rows) => {
        if(err) throw err;
        res.send(rows);
    })
});
app.get ('/ugyfel/:id', (req, res) => {
    let sqlcommand =`SELECT * FROM ugyfel WHERE azon=${req.params.id}`;
    database.query(sqlcommand, (err, rows) => {
        if(err) throw err;
        res.send(rows);
    })
});
app.listen (3000, () => {
    console.log('Server is running on port 3000');
});