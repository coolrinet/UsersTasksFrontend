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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private usersService = inject(UsersService);

  displayedColumns: string[] = ['name', 'email', 'actions'];

  isLoading = signal(false);

  users: UserDTO[] = [];

  ngOnInit() {
    this.isLoading.set(true);

    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
