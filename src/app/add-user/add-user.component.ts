import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  private usersService = inject(UsersService);
  private router = inject(Router);
  firstName = '';
  lastName = '';
  email = '';
  phone = '';

  message = '';
  succeeded = false;
  isSubmitting = false;

  onCancel() {
    this.router.navigate(['/users']);
  }
  onSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };

    this.usersService.addUser(user).subscribe({
      next: (response) => {
        this.succeeded = true;
        this.message = 'User added successfully';

        this.router.navigate(['/users', response.id, 'details']);
      },
      error: (err) => {
        this.succeeded = false;
        this.message = err.error;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
