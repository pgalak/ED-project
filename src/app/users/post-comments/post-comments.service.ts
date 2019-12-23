import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostCommentsService {
  

  constructor(private http: HttpClient) {}

  fetchPostAndComments(userId: number, postId: number) {
    let postData = this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${userId}/posts/${postId}`);

    let comments = this.http.get(`http://5da8543fe44c790014cd4b86.mockapi.io/users/${userId}/posts/${postId}/comments`);

    return forkJoin([postData, comments]);
  }
}