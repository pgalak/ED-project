import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { Subscription } from 'rxjs';

import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['username', 'fullName', 'email', 'viewposts'];
  dataSource = new MatTableDataSource<any>();
  userSub: Subscription;
  isLoading: boolean;
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.userSub = this.paginator.page.pipe(
      switchMap(() => {
        this.isLoading = true;
        return this.userService.fetch(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data => {
        this.isLoading = false;
        this.resultsLength = data['total'];
        return data;
      })
    ).subscribe(data => { 
      this.dataSource.data = Object.values(data['items']);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.userSub = this.paginator.page.pipe(
    //   switchMap(() => {
    //     this.isLoading = true;
    //     return this.userService.fetch(this.paginator.pageIndex, this.paginator.pageSize)
    //   }),
    //   map(data => {
    //     this.isLoading = false;
    //     this.resultsLength = data['total'];
    //     return data;
    //   })
    // ).subscribe(data => { 
    //   this.dataSource.data = Object.values(data['items']);
    // });
    
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
