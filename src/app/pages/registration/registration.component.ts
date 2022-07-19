import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(10), Validators.required]),
  });

  constructor(userService: UserService) { }

  ngOnInit(): void {
  }

  public formSubmitted(e: Event) {
    e.preventDefault();
    console.log(this.registrationForm.value as IRegistrationData)
  }

}
