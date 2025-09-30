import { Injectable } from '@angular/core';
import { UserRequest } from './generated/user_pb';
import { UserServiceClient } from './generated/user_pb_service';

@Injectable({ providedIn: 'root' })
export class UserGrpcService {
  private readonly client = new UserServiceClient('http://localhost:7147');

  getUserById(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new UserRequest();
      request.setId(id);

      this.client.getUserById(request, {}, (err, response) => {
        if (err) reject(err);
        else {
            console.log('gRPC response received:');
            const message = response.getMessage()
            console.log(message);
        }
      });
    });
  }
}
