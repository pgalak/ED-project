import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { Subscription, merge } from 'rxjs';

import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns = ['username', 'fullName', 'email', 'viewposts'];
  // dataSource = new MatTableDataSource<any>();
  userSub: Subscription;
  isLoading: boolean;
  resultsLength = 0;
  data: User[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // console.log('oninit')
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
    //   console.log(this.dataSource.data);
    // });
    merge(this.paginator.page).pipe(
      switchMap(() => {
        this.isLoading = true;
        return this.userService!.fetch(this.paginator.pageIndex, this.paginator.pageSizeOptions)
      }),
      map(data => {
        this.isLoading = false;
        this.resultsLength = data.total;

        return data.items;
      })
    ).subscribe(data => { 
      this.data = data;
      // this.dataSource.data = Object.values(data['items']);
    });
  }

  // ngAfterViewInit() {
  //   console.log('view init')
  //   // this.dataSource.paginator = this.paginator;
  //   // this.userSub = this.paginator.page.pipe(
  //   merge(this.paginator.page).pipe(
  //     switchMap(() => {
  //       this.isLoading = true;
  //       return this.userService!.fetch(this.paginator.pageIndex, this.paginator.pageSize)
  //     }),
  //     map(data => {
  //       this.isLoading = false;
  //       this.resultsLength = data.total;

  //       return data.items;
  //     })
  //   ).subscribe(data => { 
  //     this.data = data;
  //     // this.dataSource.data = Object.values(data['items']);
  //   });
    
  // }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }
}
