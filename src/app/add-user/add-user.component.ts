import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  private usersService = inject(UsersService);

  firstName = '';
  lastName = '';
  email = '';
  phone = '';

  message = '';
  succeeded = false;
  isSubmitting = false;

  onCancel() {}
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

        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
      },
      error: (err) => {
        this.succeeded = false;
        this.message = err.message;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
