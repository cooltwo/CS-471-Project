import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private http: HttpClient, private currentUserService: CurrentUserService) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.maxLength(16)),
    password: new FormControl('', Validators.maxLength(16))
  });

  login(){
    this.http.post('/api/login', this.loginForm.value).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "approved") {
        this.currentUserService.username = json.username;
        this.currentUserService.userType = json.userType;
        this.router.navigateByUrl('/home');
      }
    })
  }
}
