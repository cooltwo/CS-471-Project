import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-signup-tutor-page',
  templateUrl: './signup-tutor-page.component.html',
  styleUrls: ['./signup-tutor-page.component.css']
})
export class SignupTutorPageComponent {

  constructor(private router: Router, private http: HttpClient, private currentUserService: CurrentUserService) {}

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.maxLength(16), Validators.required]),
    password: new FormControl('', [Validators.maxLength(16), Validators.required])
  });

  signup() {
    this.http.post('/api/newtutor', this.signupForm.value).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "approved") {
        this.currentUserService.username = json.username;
        this.currentUserService.userType = json.userType;
        this.router.navigateByUrl('/home/account-information');
      }
    });
  }
}
