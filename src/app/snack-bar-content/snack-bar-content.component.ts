import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-snack-bar-content',
  imports: [NgClass],
  templateUrl: './snack-bar-content.component.html',
  styleUrl: './snack-bar-content.component.scss',
})
export class SnackBarContentComponent {
  data = inject<{
    content: string;
    success: boolean;
  }>(MAT_SNACK_BAR_DATA);
}
