import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostCommentsService {
  
  constructor(private http: HttpClient) {}

  fetchPost(userId: string, postId: string): Observable<any> {
    return  this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${userId}/posts/${postId}`);
  }

  fetchComments(userId: string, postId: string): Observable<any> {
    return this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${userId}/posts/${postId}/comments`);
  }
}