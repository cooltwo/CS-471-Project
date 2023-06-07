import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CurrentUserService } from '../current-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor(private router: Router, private currentUserService: CurrentUserService) {
    if(this.currentUserService.username == "") {
      this.router.navigateByUrl('/');
    }
  }

  username = this.currentUserService.username;

}
