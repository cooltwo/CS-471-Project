const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const fs = require('fs');

app.use(bodyParser.json());

app.post('/api/login', (req,res) => {
    fs.readFile("database/logins/" + req.body.username + '.json', (err, data) => {
        if(err) {
            res.json({response: "no username on record"})
        }
        else {
            let loginCred = JSON.parse(data);
            if(loginCred.password == req.body.password) {
                res.json({response: "approved", username: loginCred.username, userType: loginCred.userType})
            }
            else {
                res.json({response: "password incorrect"})
            }
        }
    })
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});