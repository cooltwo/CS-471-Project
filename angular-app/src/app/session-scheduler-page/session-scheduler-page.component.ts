import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-session-scheduler-page',
  templateUrl: './session-scheduler-page.component.html',
  styleUrls: ['./session-scheduler-page.component.css']
})
export class SessionSchedulerPageComponent {

  courses = [];
  tutors = [];

  constructor(private router: Router, private http: HttpClient, private currentUserService: CurrentUserService) {
    let sendJson = {
      username: this.currentUserService.username,
    };
    this.http.post('/api/myCourses', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "success") {
        this.courses = json.courses;
      }
    });
  }

  courseSelectionForm = new FormGroup({
    course: new FormControl("")
  });

  
  tutorSelectionForm = new FormGroup({
    tutor: new FormControl("")
  });

  availableTimes = new FormGroup({
    sunday0: new FormControl(false), sunday1: new FormControl(false), sunday2: new FormControl(false), sunday3: new FormControl(false), sunday4: new FormControl(false), sunday5: new FormControl(false), sunday6: new FormControl(false), sunday7: new FormControl(false), sunday8: new FormControl(false), sunday9: new FormControl(false), sunday10: new FormControl(false), sunday11: new FormControl(false), sunday12: new FormControl(false), sunday13: new FormControl(false), sunday14: new FormControl(false), sunday15: new FormControl(false), sunday16: new FormControl(false), sunday17: new FormControl(false), sunday18: new FormControl(false), sunday19: new FormControl(false), sunday20: new FormControl(false), sunday21: new FormControl(false), sunday22: new FormControl(false), sunday23: new FormControl(false),
    monday0: new FormControl(false), monday1: new FormControl(false), monday2: new FormControl(false), monday3: new FormControl(false), monday4: new FormControl(false), monday5: new FormControl(false), monday6: new FormControl(false), monday7: new FormControl(false), monday8: new FormControl(false), monday9: new FormControl(false), monday10: new FormControl(false), monday11: new FormControl(false), monday12: new FormControl(false), monday13: new FormControl(false), monday14: new FormControl(false), monday15: new FormControl(false), monday16: new FormControl(false), monday17: new FormControl(false), monday18: new FormControl(false), monday19: new FormControl(false), monday20: new FormControl(false), monday21: new FormControl(false), monday22: new FormControl(false), monday23: new FormControl(false),
    tuesday0: new FormControl(false), tuesday1: new FormControl(false), tuesday2: new FormControl(false), tuesday3: new FormControl(false), tuesday4: new FormControl(false), tuesday5: new FormControl(false), tuesday6: new FormControl(false), tuesday7: new FormControl(false), tuesday8: new FormControl(false), tuesday9: new FormControl(false), tuesday10: new FormControl(false), tuesday11: new FormControl(false), tuesday12: new FormControl(false), tuesday13: new FormControl(false), tuesday14: new FormControl(false), tuesday15: new FormControl(false), tuesday16: new FormControl(false), tuesday17: new FormControl(false), tuesday18: new FormControl(false), tuesday19: new FormControl(false), tuesday20: new FormControl(false), tuesday21: new FormControl(false), tuesday22: new FormControl(false), tuesday23: new FormControl(false),
    wednesday0: new FormControl(false), wednesday1: new FormControl(false), wednesday2: new FormControl(false), wednesday3: new FormControl(false), wednesday4: new FormControl(false), wednesday5: new FormControl(false), wednesday6: new FormControl(false), wednesday7: new FormControl(false), wednesday8: new FormControl(false), wednesday9: new FormControl(false), wednesday10: new FormControl(false), wednesday11: new FormControl(false), wednesday12: new FormControl(false), wednesday13: new FormControl(false), wednesday14: new FormControl(false), wednesday15: new FormControl(false), wednesday16: new FormControl(false), wednesday17: new FormControl(false), wednesday18: new FormControl(false), wednesday19: new FormControl(false), wednesday20: new FormControl(false), wednesday21: new FormControl(false), wednesday22: new FormControl(false), wednesday23: new FormControl(false),
    thursday0: new FormControl(false), thursday1: new FormControl(false), thursday2: new FormControl(false), thursday3: new FormControl(false), thursday4: new FormControl(false), thursday5: new FormControl(false), thursday6: new FormControl(false), thursday7: new FormControl(false), thursday8: new FormControl(false), thursday9: new FormControl(false), thursday10: new FormControl(false), thursday11: new FormControl(false), thursday12: new FormControl(false), thursday13: new FormControl(false), thursday14: new FormControl(false), thursday15: new FormControl(false), thursday16: new FormControl(false), thursday17: new FormControl(false), thursday18: new FormControl(false), thursday19: new FormControl(false), thursday20: new FormControl(false), thursday21: new FormControl(false), thursday22: new FormControl(false), thursday23: new FormControl(false),
    friday0: new FormControl(false), friday1: new FormControl(false), friday2: new FormControl(false), friday3: new FormControl(false), friday4: new FormControl(false), friday5: new FormControl(false), friday6: new FormControl(false), friday7: new FormControl(false), friday8: new FormControl(false), friday9: new FormControl(false), friday10: new FormControl(false), friday11: new FormControl(false), friday12: new FormControl(false), friday13: new FormControl(false), friday14: new FormControl(false), friday15: new FormControl(false), friday16: new FormControl(false), friday17: new FormControl(false), friday18: new FormControl(false), friday19: new FormControl(false), friday20: new FormControl(false), friday21: new FormControl(false), friday22: new FormControl(false), friday23: new FormControl(false),
    saturday0: new FormControl(false), saturday1: new FormControl(false), saturday2: new FormControl(false), saturday3: new FormControl(false), saturday4: new FormControl(false), saturday5: new FormControl(false), saturday6: new FormControl(false), saturday7: new FormControl(false), saturday8: new FormControl(false), saturday9: new FormControl(false), saturday10: new FormControl(false), saturday11: new FormControl(false), saturday12: new FormControl(false), saturday13: new FormControl(false), saturday14: new FormControl(false), saturday15: new FormControl(false), saturday16: new FormControl(false), saturday17: new FormControl(false), saturday18: new FormControl(false), saturday19: new FormControl(false), saturday20: new FormControl(false), saturday21: new FormControl(false), saturday22: new FormControl(false), saturday23: new FormControl(false),
  });

  timeSelectionForm = new FormGroup({
    times: new FormArray([
      new FormArray([this.availableTimes.get('sunday0') as FormControl, this.availableTimes.get('sunday1') as FormControl, this.availableTimes.get('sunday2') as FormControl, this.availableTimes.get('sunday3') as FormControl, this.availableTimes.get('sunday4') as FormControl, this.availableTimes.get('sunday5') as FormControl, this.availableTimes.get('sunday6') as FormControl, this.availableTimes.get('sunday7') as FormControl, this.availableTimes.get('sunday8') as FormControl, this.availableTimes.get('sunday9') as FormControl, this.availableTimes.get('sunday10') as FormControl, this.availableTimes.get('sunday11') as FormControl, this.availableTimes.get('sunday12') as FormControl, this.availableTimes.get('sunday13') as FormControl, this.availableTimes.get('sunday14') as FormControl, this.availableTimes.get('sunday15') as FormControl, this.availableTimes.get('sunday16') as FormControl, this.availableTimes.get('sunday17') as FormControl, this.availableTimes.get('sunday18') as FormControl, this.availableTimes.get('sunday19') as FormControl, this.availableTimes.get('sunday20') as FormControl, this.availableTimes.get('sunday21') as FormControl, this.availableTimes.get('sunday22') as FormControl, this.availableTimes.get('sunday23') as FormControl]),
      new FormArray([this.availableTimes.get('monday0') as FormControl, this.availableTimes.get('monday1') as FormControl, this.availableTimes.get('monday2') as FormControl, this.availableTimes.get('monday3') as FormControl, this.availableTimes.get('monday4') as FormControl, this.availableTimes.get('monday5') as FormControl, this.availableTimes.get('monday6') as FormControl, this.availableTimes.get('monday7') as FormControl, this.availableTimes.get('monday8') as FormControl, this.availableTimes.get('monday9') as FormControl, this.availableTimes.get('monday10') as FormControl, this.availableTimes.get('monday11') as FormControl, this.availableTimes.get('monday12') as FormControl, this.availableTimes.get('monday13') as FormControl, this.availableTimes.get('monday14') as FormControl, this.availableTimes.get('monday15') as FormControl, this.availableTimes.get('monday16') as FormControl, this.availableTimes.get('monday17') as FormControl, this.availableTimes.get('monday18') as FormControl, this.availableTimes.get('monday19') as FormControl, this.availableTimes.get('monday20') as FormControl, this.availableTimes.get('monday21') as FormControl, this.availableTimes.get('monday22') as FormControl, this.availableTimes.get('monday23') as FormControl]),
      new FormArray([this.availableTimes.get('tuesday0') as FormControl, this.availableTimes.get('tuesday1') as FormControl, this.availableTimes.get('tuesday2') as FormControl, this.availableTimes.get('tuesday3') as FormControl, this.availableTimes.get('tuesday4') as FormControl, this.availableTimes.get('tuesday5') as FormControl, this.availableTimes.get('tuesday6') as FormControl, this.availableTimes.get('tuesday7') as FormControl, this.availableTimes.get('tuesday8') as FormControl, this.availableTimes.get('tuesday9') as FormControl, this.availableTimes.get('tuesday10') as FormControl, this.availableTimes.get('tuesday11') as FormControl, this.availableTimes.get('tuesday12') as FormControl, this.availableTimes.get('tuesday13') as FormControl, this.availableTimes.get('tuesday14') as FormControl, this.availableTimes.get('tuesday15') as FormControl, this.availableTimes.get('tuesday16') as FormControl, this.availableTimes.get('tuesday17') as FormControl, this.availableTimes.get('tuesday18') as FormControl, this.availableTimes.get('tuesday19') as FormControl, this.availableTimes.get('tuesday20') as FormControl, this.availableTimes.get('tuesday21') as FormControl, this.availableTimes.get('tuesday22') as FormControl, this.availableTimes.get('tuesday23') as FormControl]),
      new FormArray([this.availableTimes.get('wednesday0') as FormControl, this.availableTimes.get('wednesday1') as FormControl, this.availableTimes.get('wednesday2') as FormControl, this.availableTimes.get('wednesday3') as FormControl, this.availableTimes.get('wednesday4') as FormControl, this.availableTimes.get('wednesday5') as FormControl, this.availableTimes.get('wednesday6') as FormControl, this.availableTimes.get('wednesday7') as FormControl, this.availableTimes.get('wednesday8') as FormControl, this.availableTimes.get('wednesday9') as FormControl, this.availableTimes.get('wednesday10') as FormControl, this.availableTimes.get('wednesday11') as FormControl, this.availableTimes.get('wednesday12') as FormControl, this.availableTimes.get('wednesday13') as FormControl, this.availableTimes.get('wednesday14') as FormControl, this.availableTimes.get('wednesday15') as FormControl, this.availableTimes.get('wednesday16') as FormControl, this.availableTimes.get('wednesday17') as FormControl, this.availableTimes.get('wednesday18') as FormControl, this.availableTimes.get('wednesday19') as FormControl, this.availableTimes.get('wednesday20') as FormControl, this.availableTimes.get('wednesday21') as FormControl, this.availableTimes.get('wednesday22') as FormControl, this.availableTimes.get('wednesday23') as FormControl]),
      new FormArray([this.availableTimes.get('thursday0') as FormControl, this.availableTimes.get('thursday1') as FormControl, this.availableTimes.get('thursday2') as FormControl, this.availableTimes.get('thursday3') as FormControl, this.availableTimes.get('thursday4') as FormControl, this.availableTimes.get('thursday5') as FormControl, this.availableTimes.get('thursday6') as FormControl, this.availableTimes.get('thursday7') as FormControl, this.availableTimes.get('thursday8') as FormControl, this.availableTimes.get('thursday9') as FormControl, this.availableTimes.get('thursday10') as FormControl, this.availableTimes.get('thursday11') as FormControl, this.availableTimes.get('thursday12') as FormControl, this.availableTimes.get('thursday13') as FormControl, this.availableTimes.get('thursday14') as FormControl, this.availableTimes.get('thursday15') as FormControl, this.availableTimes.get('thursday16') as FormControl, this.availableTimes.get('thursday17') as FormControl, this.availableTimes.get('thursday18') as FormControl, this.availableTimes.get('thursday19') as FormControl, this.availableTimes.get('thursday20') as FormControl, this.availableTimes.get('thursday21') as FormControl, this.availableTimes.get('thursday22') as FormControl, this.availableTimes.get('thursday23') as FormControl]),
      new FormArray([this.availableTimes.get('friday0') as FormControl, this.availableTimes.get('friday1') as FormControl, this.availableTimes.get('friday2') as FormControl, this.availableTimes.get('friday3') as FormControl, this.availableTimes.get('friday4') as FormControl, this.availableTimes.get('friday5') as FormControl, this.availableTimes.get('friday6') as FormControl, this.availableTimes.get('friday7') as FormControl, this.availableTimes.get('friday8') as FormControl, this.availableTimes.get('friday9') as FormControl, this.availableTimes.get('friday10') as FormControl, this.availableTimes.get('friday11') as FormControl, this.availableTimes.get('friday12') as FormControl, this.availableTimes.get('friday13') as FormControl, this.availableTimes.get('friday14') as FormControl, this.availableTimes.get('friday15') as FormControl, this.availableTimes.get('friday16') as FormControl, this.availableTimes.get('friday17') as FormControl, this.availableTimes.get('friday18') as FormControl, this.availableTimes.get('friday19') as FormControl, this.availableTimes.get('friday20') as FormControl, this.availableTimes.get('friday21') as FormControl, this.availableTimes.get('friday22') as FormControl, this.availableTimes.get('friday23') as FormControl]),
      new FormArray([this.availableTimes.get('saturday0') as FormControl, this.availableTimes.get('saturday1') as FormControl, this.availableTimes.get('saturday2') as FormControl, this.availableTimes.get('saturday3') as FormControl, this.availableTimes.get('saturday4') as FormControl, this.availableTimes.get('saturday5') as FormControl, this.availableTimes.get('saturday6') as FormControl, this.availableTimes.get('saturday7') as FormControl, this.availableTimes.get('saturday8') as FormControl, this.availableTimes.get('saturday9') as FormControl, this.availableTimes.get('saturday10') as FormControl, this.availableTimes.get('saturday11') as FormControl, this.availableTimes.get('saturday12') as FormControl, this.availableTimes.get('saturday13') as FormControl, this.availableTimes.get('saturday14') as FormControl, this.availableTimes.get('saturday15') as FormControl, this.availableTimes.get('saturday16') as FormControl, this.availableTimes.get('saturday17') as FormControl, this.availableTimes.get('saturday18') as FormControl, this.availableTimes.get('saturday19') as FormControl, this.availableTimes.get('saturday20') as FormControl, this.availableTimes.get('saturday21') as FormControl, this.availableTimes.get('saturday22') as FormControl, this.availableTimes.get('saturday23') as FormControl]),
    ]),
  });

  courseSelectionHidden = false;
  tutorSelectionHidden = true;
  timeSelectionHidden = true;

  selectAuto() {
    let sendJson = {
      username: this.currentUserService.username,
      course: this.courseSelectionForm.value.course,
    };
    console.log(sendJson);
    this.http.post('/api/autoSchedule', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      alert(json.response);
      if(json.response == "success") {
        let sendJson = {
          studentname: this.currentUserService.username,
          tutorname: json.tutor,
          day: json.day,
          hour: json.hour,
        };
        this.http.post('/api/createScheduledSession', sendJson).subscribe(response => {
          let json = JSON.parse(JSON.stringify(response))
          console.log(json);
          if(json.response == "success") {
            this.router.navigateByUrl('/home');
          }
        });
      }
    });
  }

  selectManual() {
    let sendJson = {
      course: this.courseSelectionForm.value.course,
    };
    console.log(sendJson);
    this.http.post('/api/tutorsForCourse', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "no tutors found for course") {
        alert("No tutor found for this course. ");
      }
      else if(json.response == "success") {
        this.tutors = json.tutors;
        this.courseSelectionHidden = true; 
        this.tutorSelectionHidden = false;
      }
    });
  }

  selectTutor() {
    let sendJson = {
      studentname: this.currentUserService.username,
      tutorname: this.tutorSelectionForm.value.tutor,
    };
    console.log(sendJson);
    this.http.post('/api/sharedTimes', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "success") {
        let tableArray = this.timeSelectionForm.get('times') as FormArray;
        for(let i = 0; i < tableArray.length; i++) {
          let tableArrayCol = tableArray.at(i) as FormArray;
          for(let j = 0; j < tableArrayCol.length; j++) {
            if(json.matches[i][j] == false)
              tableArrayCol.at(j).disable();
          }
        }
        this.tutorSelectionHidden = true; 
        this.timeSelectionHidden = false;
      }
    });
  }

  selectTime() {
    let day = -1;
    let hour = -1;
    let tableArray = this.timeSelectionForm.get('times') as FormArray;
    for(let i = 0; i < tableArray.length; i++) {
      let tableArrayCol = tableArray.at(i) as FormArray;
      for(let j = 0; j < tableArrayCol.length; j++) {
        if(tableArrayCol.at(j).value == true) {
          day = i;
          hour = j;
          break;
        }
      }
      if(day != -1)
        break;
    }
    if(day == -1 || hour == -1) {
      console.log("no time selected");
      return;
    }
    let sendJson = {
      studentname: this.currentUserService.username,
      tutorname: this.tutorSelectionForm.value.tutor,
      day: day,
      hour: hour,
    };
    this.http.post('/api/createScheduledSession', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "success") {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
