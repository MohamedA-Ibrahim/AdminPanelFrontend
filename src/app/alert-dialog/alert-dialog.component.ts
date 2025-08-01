import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  imports: [MatDialogActions, MatDialogContent, MatDialogClose],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent { dialogRef = inject<MatDialogRef<AlertDialogComponent>>(MatDialogRef);
 data = inject<{
    title: string;
    message: string;
}>(MAT_DIALOG_DATA);

}
