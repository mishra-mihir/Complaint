import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-post-greivance',
  templateUrl: './post-greivance.component.html',
  styleUrls: ['./post-greivance.component.css']
})
export class PostGreivanceComponent implements OnInit {

  greivanceCategory = ['Acedemic', 'Accounts & Billing', 'Exam Cell', 'Laboratory', 'Library', 'T&P Cell', 'Canteen', 'Others'];

  greivanceData: any;

  greivanceForm: FormGroup = new FormGroup({
    greivanceType: new FormControl('', Validators.required),
    Subject: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required)
  });



  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  postGreivance() {
    // console.log(localStorage.getItem('id'));

    // Adding _id to identify the user.
    let data = {
      _id: JSON.parse(localStorage.getItem('id')),
      greivanceType: this.greivanceForm.value.greivanceType,
      Subject: this.greivanceForm.value.Subject,
      Description: this.greivanceForm.value.Description
    }


    this.studentService.postGreivance(data).subscribe(res => {
      console.log(res);
      alert('Greivance Registered Successfully.')
    },
      err => {
        console.log(err);
      }
    )
    // console.log(this.greivanceForm.value);

  }

}
