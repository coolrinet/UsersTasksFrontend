import { TaskStatus } from '../enums/task-status';

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  userId: number | null;
}
