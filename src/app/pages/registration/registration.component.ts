import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {UserService} from "../../services/user/user.service";
import {IRegistrationResult} from "../../interfaces/IRegistrationResult";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationSuccessful = false;

  public registrationForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(10), Validators.required]),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public async formSubmitted(e: Event) {
    e.preventDefault();
    console.log(this.registrationForm)
    if (this.registrationForm.status === "VALID") {
      (await this.userService.registerUser(this.registrationForm.value as IRegistrationData))
        .subscribe(result => {
          if ((result as IRegistrationResult).registrationSuccessful) {
            this.registrationSuccessful = (result as IRegistrationResult).registrationSuccessful
          }
        });
    }
  }

}
