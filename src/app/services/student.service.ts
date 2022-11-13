import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url: string = 'http://localhost:3000/student';

  constructor(private http: HttpClient) { }

  postStudent(formData) {
    return this.http.post(this.url, formData);
  }

  postGreivance(formData) {
    return this.http.post('http://localhost:3000/greivance', formData)
  }

  changeGreivanceStatus(complaintId, userId, currentStatus) {
    return this.http.post('http://localhost:3000/greivance/changeStatus', { userId: userId, complaintId: complaintId, Status: currentStatus });
  }

  getUserGreivance(id) {
    return this.http.get(`http://localhost:3000/greivance?id=${id}`);
  }

  getUserDetails(id) {
    return this.http.get(`http://localhost:3000/student?id=${id}`);
  }

  editProfile(formData) {
    return this.http.put('http://localhost:3000/student', formData);
  }

  changePassword(formData) {
    return this.http.put('http://localhost:3000/changePassword', formData);
  }
}
