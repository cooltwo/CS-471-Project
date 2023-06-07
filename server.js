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

AVAILABLE_INIT_ARRAY = [[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]];

app.post('/api/newstudent', (req,res) => {
   user_path = "database/logins/" + req.body.username + ".json";
   info_path = "database/userinfo/" + req.body.username + ".json";
   if (!fs.existsSync(user_path))
   {
       data = {username:req.body.username, password:req.body.password, userType:0};
       firstWriteSuccess = false;
       fs.writeFile(user_path, data, err => {
           if(err)
           { res.json({response: "cannot create file"}) }
           else
           { firstWriteSuccess = true }
       });
       if (firstWriteSuccess) {
           data = {username:req.body.username, usertype:0, courses:[], userfiles:[], sessions:[], available:AVAILABLE_INIT_ARRAY};
           fs.writeFile(info_path, data, err => {
               if(err)
               { res.json({response: "cannot create file"}) }
               else
               { res.json({response: "approved", username:req.body.username, userType:0}) }
           });
       }
   }
   else
   { res.json({response: "already exists"}) }
});

app.post('/api/newtutor', (req,res) => {
   user_path = "database/logins/" + req.body.username + ".json";
   info_path = "database/userinfo/" + req.body.username + ".json";
   if (!fs.existsSync(user_path))
   {
       data = {username:req.body.username, password:req.body.password, userType:1};
       firstWriteSuccess = false;
       fs.writeFile(user_path, data, err => {
           if(err)
           { res.json({response: "cannot create file"}) }
           else
           { firstWriteSuccess = true }
       });
       if (firstWriteSuccess) {
           data = {username:req.body.username, usertype:1, courses:[], userfiles:[], sessions:[], available:AVAILABLE_INIT_ARRAY};
           fs.writeFile(info_path, data, err => {
               if(err)
               { res.json({response: "cannot create file"}) }
               else
               { res.json({response: "approved", username:req.body.username, userType:1}) }
           });
       }
   }
   else
   { res.json({response: "already exists"}) }
});

app.post('/api/tutorsForCourse', (req,res) => {
    course_path = "database/courses/" + req.body.course + ".json"
    if (fs.existsSync(course_path)){
        tutors_list = [];
        fs.readdirSync('database/userinfo/').forEach(file => {
            fs.readFile(file, (err, data) => {
                if(err)
                { res.json({response: "this function was probably made incorrectly"}) }
                else {
                    dataJSON = JSON.parse(data);
                    if (dataJSON.usertype == 1 && dataJSON.courses.includes(req.body.course)) {
                        tutors_list.push(dataJSON.username)
                    }
                }
            });
        });
        if (tutors_list.length == 0)
        { res.json({response: "no tutors found for course"}) }
        else
        { res.json({response: "success", tutors:tutors_list}) }
    }
    else
    { res.json({response: "course not found"}) }
});

app.post('/api/myCourses', (req,res) => {
    user_path = "database/userinfo/" + req.body.username + ".json"
    fs.readFile(user_path, (err, data) => {
        if(err)
        { res.json({response: "user not found"}) }
        else {
            dataJSON = JSON.parse(data);
            res.json({response:"success", courses:dataJSON.courses.stringify()})
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
