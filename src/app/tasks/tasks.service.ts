import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDTO } from '../../dtos/task-dto';
import { CreateTaskDto } from '../../dtos/create-task-dto';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly baseUrl = '/tasks';

  private http = inject(HttpClient);

  getAll(withUsers?: boolean) {
    return this.http.get<TaskDTO[]>(this.baseUrl, {
      params: {
        withUsers: withUsers ?? '',
      },
    });
  }

  create(dto: CreateTaskDto) {
    return this.http.post<CreateTaskDto>(this.baseUrl, dto);
  }

  update(id: number, dto: CreateTaskDto) {
    return this.http.put<CreateTaskDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
