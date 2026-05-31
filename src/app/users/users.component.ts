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
import { MatDialog } from '@angular/material/dialog';
import { UserDialog } from '../user-dialog/user-dialog';

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
  displayedColumns: string[] = ['name', 'email', 'actions'];
  isLoading = signal(false);
  users: UserDTO[] = [];
  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.fetchUsers();
  }

  onCreateUserClick() {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  onEditUserClick(user: UserDTO) {
    const dialogRef = this.dialog.open(UserDialog, {
      data: user,
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  onDeleteUserClick(userId: number) {
    this.usersService.delete(userId).subscribe({
      complete: () => {
        this.fetchUsers();
      },
    });
  }

  private fetchUsers() {
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
