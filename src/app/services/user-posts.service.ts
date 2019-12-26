import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserPost } from 'src/app/models/user-post';

@Injectable({ providedIn: 'root' })
export class UsersPostsService {

  constructor(private http: HttpClient) { }

  fetchUserData(id: string): Observable<User> {
    return this.http.get<User>(`https://5da8543fe44c790014cd4b86.mockapi.io/users/${id}`);
  }

  fetchUserPosts(id: string): Observable<UserPost[]> {
    return this.http.get<UserPost[]>(`https://5da8543fe44c790014cd4b86.mockapi.io/users/${id}/posts`);
  }
}
