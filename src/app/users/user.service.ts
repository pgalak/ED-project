import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  fetch(index: number, size: number) {
    return this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users?page=${index + 1}&limit=${size}`);

    // return this.http.get('http://5da8543fe44c790014cd4b86.mockapi.io/users?page=1&limit=5');
  }
}