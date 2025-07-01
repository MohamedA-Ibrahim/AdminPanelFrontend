import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }
}
