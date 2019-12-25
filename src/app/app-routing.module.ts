import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserPostsComponent } from './users/user-posts/user-posts.component';
import { PostCommentsComponent } from './users/post-comments/post-comments.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: ':userId/posts', component: UserPostsComponent },
  { path: ':userId/posts/:postId/comments', component: PostCommentsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }