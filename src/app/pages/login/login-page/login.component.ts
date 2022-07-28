import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserStore} from "../../../stores/user.store";
import {ILoginData} from "../../../interfaces/ILoginData";
import {IError} from "../../../interfaces/IError";
import {NgxIndexedDBService} from "ngx-indexed-db";
import * as dayjs from "dayjs";
import {IStoredData} from "../../../interfaces/IStoredData";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginError: IError = { hasOccurred: false };

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public userStore: UserStore,
              private dbService: NgxIndexedDBService) {
    this.userStore.userError$.subscribe(error => {
      this.loginError = error;
    })
  }

  ngOnInit(): void {
    let first = true;
    let chosenEntry: IStoredData | null = null;
    const day = dayjs;
    this.dbService.getAll('persistent')
      .subscribe((data) => {
        for (const entry of (data as IStoredData[])) {
          debugger;
          if (day(entry.automaticLogoutTime).isAfter(dayjs()) && first) {
            first = false;
            chosenEntry = entry;
          } else if (entry.id) {
            this.dbService.deleteByKey('persistent', entry.id).subscribe();
          }
        }
        if (chosenEntry && chosenEntry.id) {
          this.dbService.deleteByKey('persistent', chosenEntry.id).subscribe();
          this.userStore.relogin(chosenEntry);
        }
      })
  }

  public formSubmitted(e: Event) {
    e.preventDefault();
    if (this.loginForm.status === "VALID") {
      this.userStore.login(this.loginForm.value as ILoginData)
    }
  }

}
