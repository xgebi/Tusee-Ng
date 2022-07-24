import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {IUserData} from "../interfaces/IUserData";
import {IRegistrationData} from "../interfaces/IRegistrationData";
import {IError} from "../interfaces/IError";
import {UserService} from "../services/user/user.service";
import {ILoginData} from "../interfaces/ILoginData";
import { Router} from "@angular/router";
import * as dayjs from 'dayjs';
import {BoardService} from "../services/board/board.service";
import {KeyService} from "../services/key/key.service";
import {ITotpSetupResponse} from "../interfaces/ITotpSetupResponse";

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private userSubject = new BehaviorSubject<IUserData | null>(null)
  private userErrorSubject = new BehaviorSubject<IError>({hasOccurred: false})

  user$: Observable<IUserData | null> = this.userSubject.asObservable();
  userError$: Observable<IError> = this.userErrorSubject.asObservable();

  constructor(
    private userService: UserService,
    private router: Router,
    private boardService: BoardService,
    private keyService: KeyService
  ) { }

  login(data: ILoginData) {
    this.userService.loginUser(data)
      .pipe(
        map(res => {
          const decryptedKeys = this.keyService.decryptKeys(data.password, res.keys)
          res.keys = decryptedKeys;
          res.boards = this.boardService.decryptBoards(decryptedKeys, res.boards);
          return res;
        }),
        catchError(err => {
          return of(err.error)
        })
      )
      .subscribe(result => {
        if (result.loginSuccessful) {
          this.userSubject.next(result as IUserData);
          if (result?.firstLogin) {
            this.router.navigate(['/login', 'totp-setup']);
          } else if (result?.usesTotp) {
            this.router.navigate(["/login", "totp"]);
          } else {
            console.log(result);
            this.router.navigate(["/home"]);
          }
        } else {
          this.userErrorSubject.next({hasOccurred: true, message: result.error})
        }
      });
  }

  updateAutomaticLogOutTime(): boolean {
    const userData = this.userSubject.value;
    if (!!userData?.password && userData?.automaticLogoutTime.isAfter(dayjs())) {
      userData.automaticLogoutTime = dayjs().add(30, 'minutes');
      this.userSubject.next(userData as IUserData);
      return true;
    }
    return false;
  }

  getToken(): string {
    if (this.userSubject.getValue()?.token) {
      return <string>this.userSubject.getValue()?.token;
    }
    return ""
  }

  getPassword(): string {
    if (this.userSubject.getValue()?.password) {
      return <string>this.userSubject.getValue()?.password;
    }
    return ""
  }

  setupTotp(data: { skip: boolean; totpCode: string; }) {
    const userData = this.userSubject.value
    this.userService.skipTotp(data)
      .pipe(
        map(res => {
            const decryptedKeys = this.keyService.decryptKeys(this.getPassword(), res.keys)
            return {
              totpVerified: res.totpVerified,
              keys: decryptedKeys,
              boards: this.boardService.decryptBoards(decryptedKeys, res.boards),
              token: res.token,
            } as ITotpSetupResponse
          }
        )
      )
      .subscribe(result => {
        if (userData) {
          userData.keys = result.keys;
          userData.boards = result.boards;
          userData.token = result.token;
          this.userSubject.next(userData as IUserData);
          console.log(this.userSubject.value);
          if (result.totpVerified) {
            this.router.navigate(["/home"]);
          }
        }
      });
  }
}
