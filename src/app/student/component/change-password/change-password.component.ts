import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  response: any;

  changePasswordForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  })

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('id').replace("\"", "").replace("\"", "");
    this.changePasswordForm.patchValue({
      id: userId
    });
  }

  changePassword() {

    if (this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmNewPassword) {
      alert('Password not matched');
      return null;
    }

    this.studentService.changePassword(this.changePasswordForm.value).subscribe(res => {
      console.log(res);

      this.response = res;
      alert(this.response.message);
      window.location.reload();

    },
      err => {
        alert(err.error.message);

      })
  }

}
