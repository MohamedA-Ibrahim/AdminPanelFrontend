import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-grpc-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './grpc-dialog.component.html',
  styleUrls: ['./grpc-dialog.component.scss']
})
export class GrpcDialogComponent {

}
