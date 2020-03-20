import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { PostCommentsService } from "src/app/services/post-comments.service";
import { PostAndCommentsPage } from "./post-comment";
import { UserComment } from "src/app/models/user-comment";
import { UserPost } from "src/app/models/user-post";
@Component({
  selector: "app-post-comments",
  templateUrl: "./post-comments.component.html",
  styleUrls: ["./post-comments.component.css"]
})
export class PostCommentsComponent implements OnInit {
  data$: Observable<PostAndCommentsPage>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostCommentsService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("userId");
    const postId = this.route.snapshot.paramMap.get("postId");
    this.data$ = forkJoin([
      this.postService.fetchPost(userId, postId),
      this.postService.fetchComments(userId, postId)
    ]).pipe(
      map(
        ([post, comments]: [UserPost, UserComment[]]) =>
          new PostAndCommentsPage(post, comments)
      )
    );
  }
}
