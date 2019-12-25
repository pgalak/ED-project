import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';

import { Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

import { UserService } from './user.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  displayedColumns = ['username', 'fullName', 'email', 'viewposts'];
  userSub: Subscription;
  isLoading = true;
  resultsLength = 0;
  data: User[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngAfterViewInit() {
    this.userSub = this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.userService!.fetch(this.paginator.pageIndex, this.paginator.pageSize)
      })
    ).subscribe(data => { 
      this.isLoading = false;
      this.resultsLength = data.total;
      this.data = data.items;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
