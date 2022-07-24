import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
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
    TotpSetupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
