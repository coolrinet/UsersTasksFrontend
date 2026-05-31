import { Component, effect, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
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
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { TaskDTO } from '../../dtos/task-dto';
import { TasksService } from './tasks.service';
import { TaskDialog } from '../task-dialog/task-dialog';
import { TaskStatus } from '../../enums/task-status';

@Component({
  selector: 'app-tasks',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatSlideToggle,
    MatTable,
    MatHeaderCellDef,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  displayedColumns: string[] = [];
  isLoading = signal(false);
  withUsers = signal(false);
  tasks: TaskDTO[] = [];
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
  private tasksService = inject(TasksService);
  private dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      if (this.withUsers()) {
        this.displayedColumns = ['title', 'description', 'status', 'user', 'actions'];
        this.fetchTasks(this.withUsers());
      } else {
        this.displayedColumns = ['title', 'description', 'status', 'actions'];
        this.fetchTasks();
      }
    });
  }

  onFilterChange() {
    this.withUsers.update((value) => !value);
  }

  onCreateTaskClick() {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTasks();
      }
    });
  }

  onEditTaskClick(task: TaskDTO) {
    const dialogRef = this.dialog.open(TaskDialog, {
      data: task,
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTasks();
      }
    });
  }

  onDeleteTaskClick(userId: number) {
    this.tasksService.delete(userId).subscribe({
      complete: () => {
        this.fetchTasks();
      },
    });
  }

  private fetchTasks(withUsers?: boolean) {
    this.isLoading.set(true);

    this.tasksService.getAll(withUsers).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
