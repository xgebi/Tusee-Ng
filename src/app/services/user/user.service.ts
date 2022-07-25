import { Injectable } from '@angular/core';
import {IRegistrationData} from "../../interfaces/IRegistrationData";
import {ILoginData} from "../../interfaces/ILoginData";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {IChangePasswordData} from "../../interfaces/IChangePasswordData";
import {KeyService} from "../key/key.service";
import * as dayjs from 'dayjs';
import {IReceivedUserData, IUserData} from "../../interfaces/IUserData";
import {catchError, map, Observable, of} from "rxjs";
import {IRegistrationResult} from "../../interfaces/IRegistrationResult";
import {BoardService} from "../board/board.service";
import {IError} from "../../interfaces/IError";
import {ITotpSetupResponse} from "../../interfaces/ITotpSetupResponse";
import {IKey} from "../../interfaces/IKey";
import {IBoard} from "../../interfaces/IBoard";
import {UserStore} from "../../stores/user.store";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private keyService: KeyService
  ) { }

  public registerUser(data: IRegistrationData) {
    const key = this.keyService.generateKey(30);
    data.key = this.keyService.encryptSingleKey(key, data.password);
    return this.http.post<IRegistrationResult>('/api/register', data);
  }

  public loginUser(data: ILoginData): Observable<IUserData> {
    return this.http.post<IReceivedUserData>('/api/login', data)
      .pipe(
        catchError(err => {
          console.error('Failed to login');
          return of(err.error);
        }),
        map(result => {
          result.automatic_logout_time = dayjs().add(30, "minutes");
          result.password = data.password;
          return this.normalizeUserTokenForFe(result);
        })
      );
  }

  public reloginUser(): Observable<IUserData> {
    return this.http.get<IReceivedUserData>('/api/relogin')
      .pipe(
        catchError(err => {
          console.error('Error relogging in');
          return of(err.error);
        }),
        map(result => {
          result.automatic_logout_time = dayjs().add(30, "minutes");
          return this.normalizeUserTokenForFe(result);
        })
      );
  }

  public async fetchUserDetail(id: string) {

  }

  public async changePassword(id: string, data: IChangePasswordData) {

  }

  public skipTotp(data: { skip: boolean; totpCode: string; }) {
    return this.http.post<ITotpSetupResponse>('/api/totp/setup', data);
  }

  private normalizeUserTokenForFe(token: IReceivedUserData): IUserData {
    return {
      automaticLogoutTime:token.automatic_logout_time,
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
