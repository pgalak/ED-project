import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersPostsService {

  constructor(private http: HttpClient) {}

  fetchSelectedUserDataNPosts(id: number) {
    let userPosts = this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${id}/posts`);

    let userData = this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${id}`);
    
    return forkJoin([userPosts, userData]);
  }
}