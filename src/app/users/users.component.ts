import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';
import { MockApi } from '../models/mockApi';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns = ['username', 'fullName', 'email', 'viewposts'];
  pageSizeOptions = [5, 10, 20];
  subscriptions: Subscription = new Subscription();
  isLoading: boolean;
  resultsLength = 0;
  data: User[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers(0, 5);
    this.subscriptions.add(this.paginator.page.subscribe(
      () => this.getUsers(this.paginator.pageIndex, this.paginator.pageSize)
    ));
  }

  getUsers(pageIndex: number, pageSize: number) {
    this.isLoading = true;
    this.subscriptions.add(this.userService.fetchUsers(pageIndex, pageSize).subscribe(
      (data: MockApi) => {
        this.resultsLength = data.total;
        this.data = data.items;
      },
      error => console.log(error),
      () => this.isLoading = false
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
