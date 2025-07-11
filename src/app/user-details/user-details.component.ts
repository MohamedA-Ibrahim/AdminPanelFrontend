import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../User';
import { UsersService } from '../users.service';

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

  private usersService = inject(UsersService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) this.loadUserDetails(this.userId);
    });
  }

  loadUserDetails(userId: string) {
    this.isLoading = true;

    this.usersService.getUserDetails(userId).subscribe({
      next: (resData) => {
        this.currentUser = resData;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
