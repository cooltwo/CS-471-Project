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
    req.files.resume.mv(dir + "resume.pdf", function(err) {
        if(err) {
            res.json({response: "could not upload: " + err});
        }
        else {
            let userInfoFileName = "database/userinfo/" + req.body.username + ".json";
            fs.readFile(userInfoFileName, (err, data) => {
                if(err) {
                    res.json({response: "could not find userinfo file"});
                }
                else {
                    let fileJson = JSON.parse(data);
                    fileJson.userFiles.push("resume.pdf")
                    fs.writeFile(userInfoFileName, JSON.stringify(fileJson, null, 2), function writeJSON(err) {
                        if(err) {
                            res.json({response: "could not write to file"});
                        }
                        else {
                            res.json({response: "success"});
                        }
                    });
                }
            });
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
       fs.writeFile(user_path, JSON.stringify(data, null, 2), err => {
            if(err) { 
                res.json({response: "cannot create file"}) 
            }
            else { 
                data = {username:req.body.username, userType:0, courses:[], userFiles:[], sessions:[], available:AVAILABLE_INIT_ARRAY};
                fs.writeFile(info_path, JSON.stringify(data, null, 2), err => {
                    if(err)
                    { res.json({response: "cannot create file"}) }
                    else
                    { res.json({response: "approved", username:req.body.username, userType:0}) }
                });
            }
       });
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
        fs.writeFile(user_path, JSON.stringify(data, null, 2), err => {
            if(err) { 
                res.json({response: "cannot create file"}) 
            }
            else { 
                data = {username:req.body.username, userType:1, courses:[], userFiles:[], sessions:[], available:AVAILABLE_INIT_ARRAY};
                fs.writeFile(info_path, JSON.stringify(data, null, 2), err => {
                    if(err)
                    { res.json({response: "cannot create file"}) }
                    else
                    { res.json({response: "approved", username:req.body.username, userType:1}) }
                });
            }
        });
   }
   else
   { res.json({response: "already exists"}) }
});

app.post('/api/tutorsForCourse', (req,res) => {
    course_path = "database/courses/" + req.body.course + ".json"
    if (fs.existsSync(course_path)){
        tutors_list = [];
        fs.readdirSync('database/userinfo/').forEach(file => {
            data = fs.readFileSync('database/userinfo/' + file)
            dataJSON = JSON.parse(data);
            if (dataJSON.userType == 1 && dataJSON.courses.includes(req.body.course)) {
                tutors_list.push(dataJSON.username)
            }
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
            res.json({response:"success", courses:dataJSON.courses})
        }
    });
});

app.post('/api/sharedTimes', (req,res) => {
    student_path = "database/userinfo/" + req.body.studentname + ".json"
    tutor_path = "database/userinfo/" + req.body.tutorname + ".json"
    fs.readFile(student_path, (err, data_student) => {
        if (err)
        { res.json({response: "student not found"}) }
        else {
            fs.readFile(tutor_path, (err, data_tutor) => {
                if (err)
                { res.json({response: "tutor not found"}) }
                else {
                    studentJSON = JSON.parse(data_student);
                    tutorJSON = JSON.parse(data_tutor);
                    shared = AVAILABLE_INIT_ARRAY.slice(); // Copies the array
                    for (let i = 0; i < 7; i++) {
                        for (let j = 0; j < 24; j++) {
                            shared[i][j] = studentJSON.available[i][j] && tutorJSON.available[i][j];
                        }
                    }
                    res.json({response: "success", matches:shared})
                }
            });
        }
    });
});

app.post('/api/createScheduledSession', (req,res) => {
    student_path = "database/userinfo/" + req.body.studentname + ".json"
    tutor_path = "database/userinfo/" + req.body.tutorname + ".json"
    s_day = req.body.day;
    s_hour = req.body.hour;
    fs.readFile("database/next_session_id.txt", (err, next_id_raw) => {
        if (err)
        { res.json({response: "cannot get session id"}) }
        else {
            next_id = parseInt(next_id_raw) + 1;
            fs.writeFileSync("database/next_session_id.txt", next_id.toString());
            fs.readFile(student_path, (err, data_student) => {
                if (err)
                { res.json({response: "student not found"}) }
                else {
                    fs.readFile(tutor_path, (err, data_tutor) => {
                        if (err)
                        { res.json({response: "tutor not found"}) }
                        else {
                            studentJSON = JSON.parse(data_student);
                            tutorJSON = JSON.parse(data_tutor);
                            studentJSON.available[s_day][s_hour] = false;
                            tutorJSON.available[s_day][s_hour] = false;
                            studentJSON.sessions.push(next_id);
                            tutorJSON.sessions.push(next_id);
                            
                            session_obj = {session_id:next_id, userlist:[req.body.studentname, req.body.tutorname], day_of_week:s_day, time_start:s_hour, time_end:((s_hour + 1) % 24)};
                            session_path = "database/sessions/" + next_id.toString() + ".json";
                            fs.writeFile(session_path, JSON.stringify(session_obj, null, 2), err => {
                                if (err)
                                { res.json({response: "cannot create session"}) }
                                else {
                                    fs.writeFileSync(student_path, JSON.stringify(studentJSON, null, 2));
                                    fs.writeFileSync(tutor_path, JSON.stringify(tutorJSON, null, 2));
                                    res.json({response: "success"});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post("/api/getNextSession", (req,res) => {
    current_time = new Date();
    trg_day = current_time.getDay();
    trg_hour = current_time.getHours();
    user_path = "database/userinfo/" + req.body.username + ".json";
    fs.readFile(user_path, (err, data) => {
        if (err)
        { res.json({response: "user not found"}) }
        else {
            user_info = JSON.parse(data);
            if (user_info.sessions.length == 0)
            { res.json({response: "user has no sessions"}) }
            else {
                best_min = null;
                best_min_score = (7 * 24) + 24;
                user_info.sessions.forEach(session => {
                    session_path = "database/sessions/" + session + ".json";
                    curr_data = fs.readFileSync(session_path)
                    sessionJSON = JSON.parse(curr_data);
                    curr_day = parseInt(sessionJSON.day_of_week);
                    curr_hour = parseInt(sessionJSON.time_start);
                    diff_day = trg_day - curr_day;
                    if (diff_day < 0)
                    { diff_day = 7 + diff_day; }
                    diff_hour = trg_hour - curr_hour;
                    if (diff_hour < 0)
                    { diff_hour = 7 + diff_hour; }
                    curr_score = (diff_day * 24) + diff_hour;
                    if (curr_score < best_min_score) {
                        best_min_score = curr_score;
                        best_min = { ...sessionJSON };  // I think this will clone it (?)
                    }
                });
                res.json({response:"success", session_info:best_min})
            }
        }
    });
});

app.post('/api/listUserFiles', (req,res) => {
    user_path = "database/userinfo/" + req.body.username + ".json";
    fs.readFile(user_path, (err, data) => {
        if (err)
        { res.json({response: "user not found"}) }
        else {
            userJSON = JSON.parse(data);
            res.json({response:"success", files:userJSON.userFiles})
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
