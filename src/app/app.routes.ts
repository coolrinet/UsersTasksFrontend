import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Tasks } from './tasks/tasks';

export const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: "full" },
  { path: "users", component: Users },
  { path: "tasks", component: Tasks },
];
