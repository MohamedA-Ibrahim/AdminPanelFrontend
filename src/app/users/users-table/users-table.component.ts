import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../User';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormField,
    MatLabel,
    MatInputModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<User>();
  columnsToDisplay = ['firstName', 'lastName', 'email', 'phone', 'action'];

  @Input({ required: true }) users!: User[];
  @Output() deleteUserEvent = new EventEmitter<string>();
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.data = this.users;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter)
      );
    };
  }

  deleteUser(id: string) {
    this.deleteUserEvent.emit(id);
  }

  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }
}
