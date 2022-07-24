import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {UserService} from "../../services/user/user.service";
import {IRegistrationResult} from "../../interfaces/IRegistrationResult";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationSuccessful = false;
  registrationError: { message?: string, registeredUserName?: string | null } = {
    message: "",
    registeredUserName: "",
  }

  public registrationForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(10), Validators.required]),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public async formSubmitted(e: Event) {
    console.log(this.registrationForm);
    e.preventDefault();
    if (this.registrationForm.status === "VALID") {
      (await this.userService.registerUser(this.registrationForm.value as IRegistrationData))
        .pipe(
          catchError(err => {
            console.log("this is err", err);
            return of(err.error);
          })
        )
        .subscribe(result => {
          console.log("Subscribed?")
          this.registrationSuccessful = (result as IRegistrationResult).registrationSuccessful
          if (!this.registrationSuccessful) {
            this.registrationError = {
              message: (result as IRegistrationResult).error,
              registeredUserName: this.registrationForm.value.email,
          }
            console.log(this.registrationError);
          }
        });
    }
  }

}
