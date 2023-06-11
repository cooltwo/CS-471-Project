import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { SignupStudentPageComponent } from './signup-student-page/signup-student-page.component';
import { SignupTutorPageComponent } from './signup-tutor-page/signup-tutor-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountInformationPageComponent } from './account-information-page/account-information-page.component';
import { SessionSchedulerPageComponent } from './session-scheduler-page/session-scheduler-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClassContentPageComponent } from './class-content-page/class-content-page.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginPageComponent,
  },
  {
    path: 'signup-student',
    title: 'Signup',
    component: SignupStudentPageComponent,
  },
  {
    path: 'signup-tutor',
    title: 'Signup',
    component: SignupTutorPageComponent,
  },
  {
    path: 'home',
    component: TopBarComponent,
    children: [
      {
        path: 'account-information',
        title: 'Account Information',
        component: AccountInformationPageComponent,
      },
      {
        path: 'class-content',
        title: 'Class Content',
        component: ClassContentPageComponent,
      },
      {
        path: 'session-scheduler',
        title: 'Session Scheduler',
        component: SessionSchedulerPageComponent,
      },
      {
        path: '',
        title: 'Home',
        component: HomePageComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: '404',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
