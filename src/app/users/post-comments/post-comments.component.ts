import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { PostCommentsService } from './post-comments.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  post$: Observable<any>;
  comments$: Observable<any[]>;
  userId: string;
  postId: string;

  constructor(private route: ActivatedRoute,
              private postService: PostCommentsService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
      this.postId = paramMap.get('postId');
      this.post$ = this.postService.fetchPost(this.userId, this.postId)
      this.comments$ = this.postService.fetchComments(this.userId, this.postId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
