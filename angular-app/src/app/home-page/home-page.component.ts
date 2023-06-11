import { Component } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  scheduleSessionHidden = true;
  classContentHidden = true;
  manageAccountInfoHidden = true;
  enterSessionHidden = true;
  sessionDayOfWeek = "No next session";
  sessionTime = "";

  constructor(private currentUserService: CurrentUserService, private http: HttpClient) {
    if(this.currentUserService.userType == 0) {
      this.scheduleSessionHidden = false;
    }
    if(this.currentUserService.userType == 0 || this.currentUserService.userType == 1) {
      this.manageAccountInfoHidden = false;
      this.classContentHidden = false;
    }

    let sendJson = {
      username: this.currentUserService.username,
    };
    this.http.post('/api/getNextSession', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "success") {
        if(json.session_info.day_of_week == 0) {this.sessionDayOfWeek = "Sunday"}
        else if(json.session_info.day_of_week == 1) {this.sessionDayOfWeek = "Monday"}
        else if(json.session_info.day_of_week == 2) {this.sessionDayOfWeek = "Tuesday"}
        else if(json.session_info.day_of_week == 3) {this.sessionDayOfWeek = "Wednesday"}
        else if(json.session_info.day_of_week == 4) {this.sessionDayOfWeek = "Thursday"}
        else if(json.session_info.day_of_week == 5) {this.sessionDayOfWeek = "Friday"}
        else if(json.session_info.day_of_week == 6) {this.sessionDayOfWeek = "Saturday"}
        this.sessionTime = " " + json.session_info.time_start + ":00"

        let current_time = new Date();
        if(current_time.getDay() == json.session_info.day_of_week && current_time.getHours() == json.session_info.time_start)
          this.enterSessionHidden = false;
      }
    });
  }
}
