import { Component, inject, signal } from '@angular/core';
import { UsersService } from './users.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserDTO } from '../../dtos/user-dto';
import { finalize } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatProgressSpinner,
    AsyncPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private usersService = inject(UsersService);

  displayedColumns: string[] = ['name', 'email'];

  users$ = this.usersService.getAll();
}
