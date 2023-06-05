import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor(private currentUserService: CurrentUserService) {}

  username = this.currentUserService.username;

}
