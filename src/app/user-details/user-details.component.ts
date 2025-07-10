import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dummy_users } from '../dummy-users';
import { User } from '../User';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  isLoading: boolean = false;
  currentUser: User | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
if (this.userId) this.loadUserDetails(this.userId);
    });
  }

  loadUserDetails(userId: string) {
    this.isLoading = true;

    setTimeout(() => {
      this.currentUser = dummy_users.find(user=> user.id === userId);
      this.isLoading = false;
    }, 1000);
  }
}
