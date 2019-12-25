import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsersPostsService } from './user-posts.service';
import { User } from 'src/app/models/user';
import { UserPosts } from 'src/app/models/user-posts';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  user$: Observable<User>;
  posts$: Observable<UserPosts[]>;

  constructor(private postsService: UsersPostsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('userId');
      this.user$ = this.postsService.fetchUserData(this.id);
      this.posts$ = this.postsService.fetchUserPosts(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
