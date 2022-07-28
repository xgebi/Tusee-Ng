import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login-page/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { BoardListComponent } from './pages/boards/board-list/board-list.component';
import { BoardDetailComponent } from './pages/boards/board-detail/board-detail.component';
import { BoardSettingsComponent } from './pages/boards/board-settings/board-settings.component';
import {HttpClientModule} from "@angular/common/http";
import { TotpComponent } from './pages/login/totp/totp.component';
import { TotpSetupComponent } from './pages/login/totp-setup/totp-setup.component';
import {httpInterceptorProviders} from "./interceptors";
import { TaskListItemComponent } from './components/tasks/task-list-item/task-list-item.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import {dbConfig} from "./app-db-config";
import { EventsListComponent } from './pages/events/events-list/events-list.component';
import { EventDetailComponent } from './pages/events/event-detail/event-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DateTimePickerComponent } from './components/shared/date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    TaskListComponent,
    TaskDetailComponent,
    BoardListComponent,
    BoardDetailComponent,
    BoardSettingsComponent,
    TotpComponent,
    TotpSetupComponent,
    TaskListItemComponent,
    EventsListComponent,
    EventDetailComponent,
    ProfileComponent,
    DateTimePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
