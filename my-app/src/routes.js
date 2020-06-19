const express = require('express');
const app = express();
const mysql = require('@mysql/xdevapi')
// const mysql = require('mysql');

const config = {
    password:   'new_password',
    user:       'gardenAdmin',
    host:       'localhost',
    schema:     'garden'
}

app.get('/', function (req, res) {
    res.send("hello world from express")
})

app.get('/api/flower', function (req, res, next) {
    mysql.getSession(config)
    .then(session => {
        return session.getSchema("garden").getTable("flower").select().execute()
    })
    .then(result => 
        res.send(result.fetchAll())
        // res.send(JSON.stringify(result.fetchAll()))
        // res.json(JSON.stringify(result.fetchAll))
    )
    .catch(function (err){
        console.log(err);
    })
})


app.listen(5000, () => {
    console.log('Go to http://localhost:5000/flower so you can see the data.');
});