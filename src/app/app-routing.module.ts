import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginRegisterComponent } from './component/login-register/login-register.component';
import { ChangePasswordComponent } from './student/component/change-password/change-password.component';
import { MyGreivanceComponent } from './student/component/my-greivance/my-greivance.component';
import { PostGreivanceComponent } from './student/component/post-greivance/post-greivance.component';
import { ProfileComponent } from './student/component/profile/profile.component';
import { StudentComponent } from './student/component/student/student.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login_register', component: LoginRegisterComponent },
  {
    path: 'student', component: StudentComponent,
    children: [
      { path: 'editprofile', component: ProfileComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'post_greivance', component: PostGreivanceComponent },
      { path: 'my_greivance', component: MyGreivanceComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
