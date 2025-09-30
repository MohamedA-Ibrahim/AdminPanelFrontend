import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserGrpcService } from '../grpc/UserGrpcService';


@Component({
  selector: 'app-grpc-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Try gRPC</h2>
    <mat-dialog-content>
      <p>GRPC.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 20px;
        min-width: 300px;
      }
    `,
  ],
})
export class GrpcDialogComponent implements OnInit {
  private readonly userGrpcService = inject(UserGrpcService);

  ngOnInit() {
    this.userGrpcService.getUserById('3F6A38E1-F7D1-44D4-8DA2-0871F3ABEECE');
  }
}
