import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-my-greivance',
  templateUrl: './my-greivance.component.html',
  styleUrls: ['./my-greivance.component.css']
})

export class MyGreivanceComponent implements OnInit {
  userGreivance: any;
  displayedColumns: string[] = ['id', 'greivanceType', 'subject', 'description', 'Date', 'status', 'action'];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.studentService.getUserGreivance(localStorage.getItem('id')).subscribe(res => {
      console.log(this.userGreivance);
      this.userGreivance = res;
      this.userGreivance = this.userGreivance[0].complaint;

    },
      err => {
        // console.log("m here");

        console.log(err);

      }
    )
  }

  changeStatus(complaintId, currentComplaintStatus) {
    console.log(complaintId);

    // let userId = JSON.stringify(localStorage.getItem('id'));

    this.studentService.changeGreivanceStatus(complaintId, localStorage.getItem('id'), currentComplaintStatus).subscribe(res => {
      console.log(res);

      window.location.reload();

    })
  }


}
