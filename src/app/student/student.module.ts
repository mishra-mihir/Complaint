// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COmponent
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { StudentComponent } from './component/student/student.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { PostGreivanceComponent } from './component/post-greivance/post-greivance.component';
import { MyGreivanceComponent } from './component/my-greivance/my-greivance.component';



@NgModule({
  declarations: [SideNavComponent, ProfileComponent, NavBarComponent, StudentComponent, ChangePasswordComponent, PostGreivanceComponent, MyGreivanceComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
