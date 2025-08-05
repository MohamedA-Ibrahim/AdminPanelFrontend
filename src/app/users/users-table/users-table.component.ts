import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter, OnChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../User';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderBy } from '../OrderBy';

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
export class UsersTableComponent implements AfterViewInit, OnChanges {
  dataSource = new MatTableDataSource<User>();
  columnsToDisplay = ['firstName', 'lastName', 'email', 'phone', 'action'];

  @Input({ required: true }) users!: User[];
  @Output() deleteUserEvent = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<{
    orderASC: boolean;
    orderBy: OrderBy | null;
  }>();
  @Output() filterChanged = new EventEmitter<string>();

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.data = this.users;
  }

  ngOnChanges(){
        this.dataSource.data = this.users;

  }
  
  deleteUser(id: string) {
    this.deleteUserEvent.emit(id);
  }

  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filterChanged.emit(searchValue);
  }

  onSortChange(event: Sort) {
    const orderASC = event.direction == 'asc';
    let order: OrderBy | null = null;

    console.log(event);
    switch (event.active) {
      case 'firstName':
        order = OrderBy.FirstName;
        break;
      case 'lastName':
        order = OrderBy.LastName;
        break;
      case 'email':
        order = OrderBy.Email;
        break;
      case 'phone':
        order = OrderBy.Phone;
        break;
    }

    this.sortChanged.emit({ orderASC: orderASC, orderBy: order });
  }

    get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
