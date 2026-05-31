import { TaskStatus } from '../enums/task-status';
import { UserDTO } from './user-dto';

export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  user: UserDTO | null;
}
