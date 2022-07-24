import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {IUserData} from "../interfaces/IUserData";
import {IRegistrationData} from "../interfaces/IRegistrationData";
import {IError} from "../interfaces/IError";
import {UserService} from "../services/user/user.service";
import {ILoginData} from "../interfaces/ILoginData";
import {Router} from "@angular/router";
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private userSubject = new BehaviorSubject<IUserData | null>(null)
  private userErrorSubject = new BehaviorSubject<IError>({hasOccurred: false})

  user$: Observable<IUserData | null> = this.userSubject.asObservable();
  userError$: Observable<IError> = this.userErrorSubject.asObservable();

  constructor(private userService: UserService, private router: Router) { }

  login(data: ILoginData) {
    this.userService.loginUser(data)
      .pipe(
        catchError(err => {
          return of(err.error)
        })
      )
      .subscribe(async result => {
        if (result.loginSuccessful) {
          this.userSubject.next(result as IUserData);
          if (result?.firstLogin) {
            await this.router.navigate(["/login/totp-setup"]);
            return;
          }
          if (result?.usesTotp) {
            await this.router.navigate(["/login/totp"]);
            return;
          }
          await this.router.navigate(["/home"])
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
}
