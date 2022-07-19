import { Injectable } from '@angular/core';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {ILoginData} from "../../interfaces/ILoginData";
import {HttpClient} from "@angular/common/http";
import {IChangePasswordData} from "../../interfaces/IChangePasswordData";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public async registerUser(data: IRegistrationData) {

  }

  public async loginUser(data: ILoginData) {

  }

  public async fetchUserDetail(id: string) {

  }

  public async changePassword(id: string, data: IChangePasswordData) {

  }
}
