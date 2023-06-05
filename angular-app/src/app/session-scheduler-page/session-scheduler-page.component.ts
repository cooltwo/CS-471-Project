import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-session-scheduler-page',
  templateUrl: './session-scheduler-page.component.html',
  styleUrls: ['./session-scheduler-page.component.css']
})
export class SessionSchedulerPageComponent {

  constructor(private router: Router) {}

  courseSelectionHidden = false;
  tutorSelectionHidden = true;
  timeSelectionHidden = true;

  selectAuto() {
    this.router.navigateByUrl('/home');
  }

  selectManual() {
    this.courseSelectionHidden = true; 
    this.tutorSelectionHidden = false;
  }

  selectTutor() {
    this.tutorSelectionHidden = true; 
    this.timeSelectionHidden = false;
  }

  selectTime() {
    this.router.navigateByUrl('/home');
  }
}
