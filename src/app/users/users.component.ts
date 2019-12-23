import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { Subscription } from 'rxjs';

import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['username', 'fullName', 'email', 'viewposts'];
  dataSource = new MatTableDataSource<any>();
  userSub: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.userService.fetch().subscribe(data => {
      this.dataSource.data = Object.values(data['items']); 
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
