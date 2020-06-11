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

app.use('/flowers', function (req, res, next) {
    mysql.getSession(config)
    .then(session => {
        return session.getSchema("garden").getTable("flower").select().execute()
    })
    .then(result => console.log(result.fetchAll()))
    .catch(function (err){
        console.log(err);
    })
})


app.listen(3000, () => {
    console.log('Go to http://localhost:3000/flower so you can see the data.');
});