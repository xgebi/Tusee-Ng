import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserStore} from "../../stores/user.store";
import {ILoginData} from "../../interfaces/ILoginData";
import {IError} from "../../interfaces/IError";

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

  constructor(public userStore: UserStore) {
    this.userStore.userError$.subscribe(error => {
      this.loginError = error;
    })
  }

  ngOnInit(): void {
  }

  public formSubmitted(e: Event) {
    e.preventDefault();
    if (this.loginForm.status === "VALID") {
      this.userStore.login(this.loginForm.value as ILoginData)
    }
  }

}
