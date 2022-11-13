import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    let token = JSON.parse(localStorage.getItem('token'));

    this.auth.checkAuth(token).subscribe(res => {
      console.log(res);
      localStorage.setItem('id', JSON.stringify(res));
    },
      (err) => {
        this.router.navigate(['/login_register']);
        // console.log(err.error.message);
      }
    );
  }

}
