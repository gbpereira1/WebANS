import { Component, OnInit ,OnDestroy } from '@angular/core';
import { UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'username'];
  dataSource: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
}

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
            this.dataSource = users;
        });
    }
    

}
