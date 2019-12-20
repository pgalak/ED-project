import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['username', 'fullName', 'email', 'viewposts'];
  dataSource = new MatTableDataSource<any>();
  users: {}[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.fetch().subscribe(data => {
      this.dataSource.data = Object.values(data['items']);
      // this.users = Object.values(data['items']);
      // console.log(Object.values(data['items']));      
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
