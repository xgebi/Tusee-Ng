import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserStore} from "../../stores/user.store";
import {ILoginData} from "../../interfaces/ILoginData";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public userStore: UserStore) { }

  ngOnInit(): void {
  }

  public formSubmitted(e: Event) {
    e.preventDefault();
    console.log(this.loginForm)
    if (this.loginForm.status === "VALID") {
      this.userStore.login(this.loginForm.value as ILoginData)
    }
  }

}
