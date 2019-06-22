const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const saltRounds = 10;

let app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'login',
    password: '1234',
    database: 'login'
});


con.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + con.threadId);
});


app.use(express.static('dist/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


function authUser(res, username, password, hash) {
    bcrypt.compare(password, hash, (err, rightPasswd) => {
        console.log(password);
        console.log(hash);
        if(err) {
            console.error(err.stack);
            return;
        }

        if(rightPasswd) res.send('correct login!');
        else res.send('incorrect login! :(');
    });
}

app.post('/auth', (req, res) => {
    let uname = req.body.username;
    let passwd = req.body.password;

    let query = 
        `SELECT hash FROM users WHERE username = '${uname}';`;
    con.query(query, (err, data) => {
        if(err) console.error(err);

        if(data.length) {
            authUser(res, uname, passwd, data[0].hash);
        }
        else res.send('user not found');
    });
});


function addUser(username, password){
    bcrypt.hash(password, saltRounds, (err, hash) => {
        let query =
            `INSERT INTO users(username, hash) VALUES('${username}', '${hash}');`;
        con.query(query, () => {
            console.log(`Inserted user ${username}`);
        });
    });
}


app.post('/add-user', (req, res) => {
    let uname = req.body.username;
    let passwd = req.body.password;

    let query_user_already_exists = 
        `SELECT * FROM users WHERE username = '${uname}'`;
    con.query(query_user_already_exists, (err, data) => {
        if(err) console.error(err);
        if(data.length) {
            res.send('user already exists');
            return;
        }
        addUser(uname, passwd);
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
