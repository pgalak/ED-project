import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UsersPostsService } from './user-posts.service';
import { UserPosts } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  id: number = null;
  avatar: string = '';
  userDataNPosts$: Observable<any>;
  sub: Subscription;
  posts: UserPosts[];
  userName: string;
  userEmail: string;
  isLoading: boolean = true;

  constructor(private postsService: UsersPostsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDataNPosts$ = this.route.params.pipe(
      switchMap((params: Params) => {
        this.isLoading = true;
        this.id = params['userId'];
        return this.postsService.fetchSelectedUserDataNPosts(this.id);
      })
    );

    this.sub = this.userDataNPosts$.subscribe(data => {
      this.userName = data[1].name;
      this.userEmail = data[1].email;
      this.avatar = data[1].avatar;
      this.posts = data[0];
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
