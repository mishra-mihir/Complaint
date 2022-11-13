import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  selectedFile: File;
  psswd: string;
  cpsswd: string;

  department = ["IT", "Computer Science", "Mechanical", "Civil", "Electroincs & Telecommunication"];

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    Gender: new FormControl('', [Validators.required]),
    Department: new FormControl('', [Validators.required]),
    acedamicYear: new FormControl('', [Validators.required]),
    Batch: new FormControl('', [Validators.required]),
    rollNo: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    // ID_photo: new FormControl(),
    Password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  },
    {
      validators: [this.pwdMatchValidator]
    }
  );

  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private http: HttpClient,
    private studentService: StudentService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  pwdMatchValidator(form: FormGroup) {
    if (form.get('Password').value != form.get('confirmPassword').value) {
      // console.log("m here");
      return { 'mismatch': true };

    } else {
      return null;
    }
  }


  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    // console.log(event.target.files[0]);
  }

  // User registration
  addUser() {
    // let fd = new FormData();
    // fd.append('id_pic', this.selectedFile, this.selectedFile.name);
    // console.log(fd);


    // password validation.
    if (this.psswd !== this.cpsswd) {
      alert("password not matched");
      return null;
    }

    console.log(this.registerForm.value);
    this.studentService.postStudent(this.registerForm.value).subscribe(res => {
      // console.log(res);
      alert("Registered Successfully");
      this.router.navigate(['/home']);

    },
      (err => {
        console.log(err);
        if (err.status == 400) {
          alert(err.error);
        }
      })
    )
  }

  // User login
  login() {
    console.log(this.loginForm);

    this.auth.login(this.loginForm.value).subscribe(res => {
      // console.log(res);
      localStorage.setItem('token', JSON.stringify(res));
      this.router.navigate(['/student']);

    },
      (err => {
        if (err.status == 400) {
          alert(err.error);
        }
        else {
          console.log(err);
        }
      })
    )


    // this.http.post('localhost:3000/login', this.loginForm.value).subscribe(res => {
    //   console.log(res);
    // })
  }
}
