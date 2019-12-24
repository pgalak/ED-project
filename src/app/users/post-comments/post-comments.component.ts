import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostCommentsService } from './post-comments.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  post$: Observable<any>;
  userId: number;
  postId: number;
  postDate: Date;
  postTitle: string;
  postBody: string;
  comments: {}[];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
              private postService: PostCommentsService) { }

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        this.isLoading = true;
        this.userId = params['userId'];
        this.postId = params['postId'];
        return this.postService.fetchPostAndComments(this.userId, this.postId);
      })
    )

    this.sub = this.post$.subscribe(data => {
      this.postDate = data[0].createdAt;
      this.postTitle = data[0].title;
      this.postBody = data[0].body;
      this.comments = data[1];
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
