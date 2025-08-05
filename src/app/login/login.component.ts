import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInput,
    FormsModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  showSpinner = false;
  private http = inject(HttpClient);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  login() {
    if (!this.username || !this.password) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Validation Error',
          message: 'Please enter both username and password.'
        }
      });
      return;
    }

    this.showSpinner = true;

    const url = 'https://localhost:5001/api/accounts/login';
    const loginRequest = { userName: this.username, password: this.password };

    this.http
      .post<{ token: string; userName: string }>(url, loginRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Login Failed',
              message: err.error.message || 'Invalid username or password'
            }
          });
          this.showSpinner = false;
        },
        complete: () => {
          this.showSpinner = false;
        },
      });
  }
}
