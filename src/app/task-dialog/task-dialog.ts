import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CreateTaskDto } from '../../dtos/create-task-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskDTO } from '../../dtos/task-dto';
import { TasksService } from '../tasks/tasks.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { TaskStatus } from '../../enums/task-status';
import { UserDTO } from '../../dtos/user-dto';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-task-dialog',
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
    MatSelect,
    MatOption,
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  data = inject<TaskDTO | null>(MAT_DIALOG_DATA);
  isEditing = !!this.data;
  taskStatuses = [
    {
      value: TaskStatus.Todo,
      label: 'Нужно сделать',
    },
    {
      value: TaskStatus.InProgress,
      label: 'В процессе',
    },
    {
      value: TaskStatus.Done,
      label: 'Сделано',
    },
  ];
  users = signal<UserDTO[]>([]);
  private formBuilder = inject(FormBuilder);
  taskForm = this.formBuilder.group({
    title: [this.data?.title ?? '', Validators.required],
    description: [this.data?.description ?? '', Validators.required],
    status: [this.data?.status ?? TaskStatus.Todo, Validators.required],
    userId: [this.data?.user?.id ?? ''],
  });
  private tasksService = inject(TasksService);
  private usersService = inject(UsersService);
  private dialogRef = inject(MatDialogRef);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.usersService.getAll().subscribe((users) => {
      this.users.set(users);
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);

    const payload = {
      ...this.taskForm.value,
      userId: this.taskForm.value.userId || undefined,
    };

    if (!this.isEditing) {
      this.tasksService.create(<CreateTaskDto>payload).subscribe({
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
      this.tasksService.update(this.data!.id, <CreateTaskDto>payload).subscribe({
        complete: () => {
          this.dialogRef.close(true);
        },
      });
    }
  }
}
