import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserPosts } from 'src/app/models/user-posts';

@Injectable({providedIn: 'root'})
export class UsersPostsService {

  constructor(private http: HttpClient) {}

  fetchUserData(id: string): Observable<User> {
    return this.http.get<User>(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${id}`);
  }

  fetchUserPosts(id: string): Observable<UserPosts[]> {
    return this.http.get<UserPosts[]>(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${id}/posts`);
  }
}