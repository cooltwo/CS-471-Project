import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupStudentPageComponent } from './signup-student-page/signup-student-page.component';
import { SignupTutorPageComponent } from './signup-tutor-page/signup-tutor-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AccountInformationPageComponent } from './account-information-page/account-information-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { SessionSchedulerPageComponent } from './session-scheduler-page/session-scheduler-page.component'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassContentPageComponent } from './class-content-page/class-content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    SignupStudentPageComponent,
    SignupTutorPageComponent,
    HomePageComponent,
    TopBarComponent,
    AccountInformationPageComponent,
    SessionSchedulerPageComponent,
    ClassContentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
