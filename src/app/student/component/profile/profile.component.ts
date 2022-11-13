import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: any;


  updateForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    Batch: new FormControl('', [Validators.required]),
    rollNo: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    // ID_photo: new FormControl(),
  })

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getUserDetails(localStorage.getItem('id')).subscribe(res => {
      this.userDetails = res

      this.updateForm.patchValue({
        _id: this.userDetails._id,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        Batch: this.userDetails.Batch,
        rollNo: this.userDetails.rollNo,
        emailId: this.userDetails.emailId,
        contactNo: this.userDetails.contactNo
      })

      console.log(this.updateForm.value);

    },
      err => {
        console.log(err.message);
      }
    )
  }

  update() {
    this.studentService.editProfile(this.updateForm.value).subscribe(res => {
      console.log(res);
      alert('Profile Updated Successfully.');
      window.location.reload();

    },
      err => {
        console.log(err.message);
      }
    )
  }


}
