import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockApi } from '../models/mockApi';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  fetchUsers(index: number, size: number): Observable<MockApi> {
    return this.http.get<MockApi>(`http://5da8543fe44c790014cd4b86.mockapi.io/users?page=${index + 1}&limit=${size}`);
  }
}