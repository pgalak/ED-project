import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserComment } from '../models/user-comment';
import { UserPost } from '../models/user-post';

@Injectable({ providedIn: 'root' })
export class PostCommentsService {
  constructor(private http: HttpClient) { }

  fetchPost(userId: string, postId: string): Observable<UserPost> {
    return this.http.get<UserPost>(`https://5da8543fe44c790014cd4b86.mockapi.io/users/${userId}/posts/${postId}`);
  }

  fetchComments(userId: string, postId: string): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(`https://5da8543fe44c790014cd4b86.mockapi.io/users/${userId}/posts/${postId}/comments`);
  }
}
