const fileUpload = require('express-fileupload');
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const fs = require('fs');

app.use(bodyParser.json());
app.use(fileUpload());

app.post('/api/login', (req,res) => {
    fs.readFile("database/logins/" + req.body.username + ".json", (err, data) => {
        if(err) {
            res.json({response: "no username on record"});
        }
        else {
            let loginCred = JSON.parse(data);
            if(loginCred.password == req.body.password) {
                res.json({response: "approved", username: loginCred.username, userType: loginCred.userType});
            }
            else {
                res.json({response: "password incorrect"});
            }
        }
    });
});

app.get('/api/getListofCourses', (req,res) => {
    let courses = []
    fs.readdir("database/courses/", function(err, filenames) {
        if(err) {
            res.json({response: "no classes found"});
        }
        else {
            filenames.forEach(function(filename) {
                courses.push(filename.split(".")[0]);
            });
            let sendJson = {
                response: "success",
                courses: courses
            }
            res.json(sendJson);
        }
    });
});

app.post('/api/getAccountInfo', (req,res) => {
    let fileName = "database/userinfo/" + req.body.username + ".json";
    fs.readFile(fileName, (err, data) => {
        if(err) {
            res.json({response: "could not find userinfo file"});
        }
        else {
            let fileJson = JSON.parse(data);
            let sendJson = {
                response: "success",
                courses: fileJson.courses,
                availableTimes: fileJson.available
            }
            res.json(sendJson);
        }
    });
});

app.post('/api/updateAccountInfo', (req,res) => {
    let fileName = "database/userinfo/" + req.body.username + ".json";
    fs.readFile(fileName, (err, data) => {
        if(err) {
            res.json({response: "could not find userinfo file"});
        }
        else {
            let fileJson = JSON.parse(data);
            fileJson.courses = req.body.courses;
            fileJson.available = req.body.availableTimes;
            fs.writeFile(fileName, JSON.stringify(fileJson, null, 2), function writeJSON(err) {
                if(err) {
                    res.json({response: "could not write to file"});
                }
                else {
                    res.json({response: "success"});
                }
            });
        }
    });
});

app.post('/api/resumeUpload', (req,res) => {
    let dir = "database/userfiles/" + req.body.username + "/";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    req.files.resume.mv(dir + req.files.resume.name, function(err) {
        if(err) {
            res.json({response: "could not upload: " + err});
        }
        else {
            res.json({response: "success"});
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});