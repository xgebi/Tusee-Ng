import { Injectable } from '@angular/core';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {ILoginData} from "../../interfaces/ILoginData";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {IChangePasswordData} from "../../interfaces/IChangePasswordData";
import {KeyService} from "../key/key.service";
import * as dayjs from 'dayjs';
import {IReceivedUserData, IUserData} from "../../interfaces/IUserData";
import {map, Observable} from "rxjs";
import {IRegistrationResult} from "../../interfaces/IRegistrationResult";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private keyService: KeyService) { }

  public registerUser(data: IRegistrationData) {
    data.key = this.keyService.generateKey(30);
    return this.http.post<IRegistrationResult>('/api/register', data);
  }

  public loginUser(data: ILoginData): Observable<IUserData> {
    return this.http.post<IReceivedUserData>('/api/login', data)
      .pipe(
        map(result => {
          return this.normalizeUserTokenForFe(result)
        })
      );
  }

  public async fetchUserDetail(id: string) {

  }

  public async changePassword(id: string, data: IChangePasswordData) {

  }

  private normalizeUserTokenForFe(token: IReceivedUserData): IUserData {
    return {
      automaticLogoutTime: dayjs(token.automatic_logout_time),
      displayName: token.display_name,
      email: token.email,
      firstLogin: token.first_login,
      keys: token.keys.map((key) => this.keyService.normalizeKeysForFe(key)),
      password: token.password,
      token: token.token,
      totpSecret: token.totp_secret,
      userUuid: token.user_uuid,
      usesTotp: token.uses_totp,
      boards: token.boards, // TODO same for boards as it is with keys,
      loginSuccessful: token.loginSuccessful
    };
  }
}
