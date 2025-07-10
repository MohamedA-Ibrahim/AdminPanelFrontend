import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  private usersService = inject(UsersService);

  firstName = '';
  lastName = '';
  email = '';
  phone = '';

  onCancel() {}
  onSubmit() {
    this.usersService.addUser({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    });
  }
}
