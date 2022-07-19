import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AuthGuard} from "./auth.guard";
import {BoardListComponent} from "./pages/boards/board-list/board-list.component";
import {BoardDetailComponent} from "./pages/boards/board-detail/board-detail.component";
import {BoardSettingsComponent} from "./pages/boards/board-settings/board-settings.component";
import {TaskListComponent} from "./pages/tasks/task-list/task-list.component";
import {TaskDetailComponent} from "./pages/tasks/task-detail/task-detail.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/home',
},
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'boards',
    component: BoardListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: BoardDetailComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'settings',
            component: BoardSettingsComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard]
          },
        ]
      },
    ]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: TaskDetailComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
