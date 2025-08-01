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

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, MatSortModule],
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
  }

  deleteUser(id: string) {
    this.deleteUserEvent.emit(id);
  }
}
