import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login-page/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AuthGuard} from "./auth.guard";
import {BoardListComponent} from "./pages/boards/board-list/board-list.component";
import {BoardDetailComponent} from "./pages/boards/board-detail/board-detail.component";
import {BoardSettingsComponent} from "./pages/boards/board-settings/board-settings.component";
import {TaskListComponent} from "./pages/tasks/task-list/task-list.component";
import {TaskDetailComponent} from "./pages/tasks/task-detail/task-detail.component";
import {TotpComponent} from "./pages/login/totp/totp.component";
import {TotpSetupComponent} from "./pages/login/totp-setup/totp-setup.component";
import {EventsListComponent} from "./pages/events/events-list/events-list.component";
import {EventDetailComponent} from "./pages/events/event-detail/event-detail.component";
import {ProfileComponent} from "./pages/profile/profile.component";

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
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'boards',
    children: [
      {
        path: '',
        component: BoardListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: BoardDetailComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
          },
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
    children: [
      {
        path: '',
        component: TaskListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: TaskDetailComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        component: EventsListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: EventDetailComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'totp',
        component: TotpComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'totp-setup',
        component: TotpSetupComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
    ]
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
