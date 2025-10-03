import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FeaturesService } from './features.service';
import { GrpcDialogComponent } from './grpc-dialog/grpc-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'AdminPanelFrontend';
  private readonly featuresService = inject(FeaturesService);
  private readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.featuresService.fetchFeatures().subscribe(features => {
      this.featuresService.setFeatures(features);
    });
  }

  openGrpcDialog() {
    this.dialog.open(GrpcDialogComponent);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get userName(): string | null {
    return localStorage.getItem('userName');
  }

  get showGrpcButton(): boolean {
    return this.featuresService.getFeatures()?.enableGrpc ?? false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
  }
}
