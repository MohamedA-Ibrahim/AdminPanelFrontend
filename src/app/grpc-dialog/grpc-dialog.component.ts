import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserServiceClient } from '../grpc/protos/UserServiceClientPb';
import * as user_pb from '../grpc/protos/user_pb';

@Component({
  selector: 'app-grpc-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './grpc-dialog.component.html',
  styleUrls: ['./grpc-dialog.component.scss']
})
export class GrpcDialogComponent implements OnInit {
  private readonly userService: UserServiceClient;
  email = '';
  firstName = '';
  lastName = '';

  constructor() {
    this.userService = new UserServiceClient('https://localhost:7147');
  }

  ngOnInit() {
    this.getUserById('3F6A38E1-F7D1-44D4-8DA2-0871F3ABEECE');
  }

  getUserById(id: string): void {
    const request = new user_pb.UserRequest();
    request.setId(id);

    this.userService.getUserById(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
      
      const user = response.toObject();
      this.email = user.email;
      this.firstName = user.firstname;
      this.lastName = user.lastname;
    });
  }
}
