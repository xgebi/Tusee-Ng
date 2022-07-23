import { Injectable } from '@angular/core';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {ILoginData} from "../../interfaces/ILoginData";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {IChangePasswordData} from "../../interfaces/IChangePasswordData";
import {KeyService} from "../key/key.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private keyService: KeyService) { }

  public async registerUser(data: IRegistrationData) {
    data.key = this.keyService.generateKey(30);
    return this.http.post('/api/register', data);
  }

  public async loginUser(data: ILoginData) {
    return this.http.post('/api/login', data);
  }

  public async fetchUserDetail(id: string) {

  }

  public async changePassword(id: string, data: IChangePasswordData) {

  }
}
