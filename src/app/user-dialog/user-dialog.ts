import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserDTO } from '../../dtos/user-dto';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../../dtos/create-user-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatError,
    MatDialogClose,
  ],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.scss',
})
export class UserDialog {
  data = inject<UserDTO | null>(MAT_DIALOG_DATA);
  isEditing = !!this.data;
  private formBuilder = inject(NonNullableFormBuilder);
  userForm = this.formBuilder.group({
    name: [this.data?.name ?? '', [Validators.required]],
    email: [this.data?.email ?? '', [Validators.required, Validators.email]],
  });
  private usersService = inject(UsersService);
  private dialogRef = inject(MatDialogRef);
  private snackBar = inject(MatSnackBar);

  onSubmit() {
    if (!this.isEditing) {
      this.usersService.create(<CreateUserDto>this.userForm.value).subscribe({
        error: (e) => {
          this.snackBar.open(e.error.message, '', {
            duration: 2000,
          });
        },
        complete: () => {
          this.dialogRef.close(true);
        },
      });
    } else {
      this.usersService.update(this.data!.id, <CreateUserDto>this.userForm.value).subscribe({
        complete: () => {
          this.dialogRef.close(true);
        },
      });
    }
  }
}
