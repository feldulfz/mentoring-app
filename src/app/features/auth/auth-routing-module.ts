import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SelectRoleComponents } from './components/select-role/select-role.components';
import { SignUpMenteeComponents } from './components/sign-up-mentee/sign-up-mentee.components';
import { SignUpMentorComponents } from './components/sign-up-mentor/sign-up-mentor.components';
import { PopulateDbComponent } from './components/db-seeder/populate.db.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'select-role',
    component: SelectRoleComponents
  },
  {
    path: 'sign-up-mentee',
    component: SignUpMenteeComponents
  },  
  {
    path: 'sign-up-mentor',
    component: SignUpMentorComponents
  },  
  {
    path: 'populate-db',
    component: PopulateDbComponent
  }            
];

export class AuthRoutingModule { }