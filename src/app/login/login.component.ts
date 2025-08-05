import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInput,
    FormsModule,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  showSpinner = false;
  message = '';
  private http = inject(HttpClient);
  private router = inject(Router);

  login() {
    this.showSpinner = true;

    const url = "https://localhost:5001/api/accounts/login"
    const loginRequest = { userName: this.username, password: this.password };

    this.http.post<{ token: string }>(url, loginRequest).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = err.error.message;
        this.showSpinner = false;
      },
      complete: () => {
        this.showSpinner = false;
      },
    });
  }
}
