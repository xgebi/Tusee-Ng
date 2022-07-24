import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {IUserData} from "../interfaces/IUserData";
import {IRegistrationData} from "../interfaces/IRegistrationData";
import {IError} from "../interfaces/IError";
import {UserService} from "../services/user/user.service";
import {ILoginData} from "../interfaces/ILoginData";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private userSubject = new BehaviorSubject<IUserData | null>(null)
  private userErrorSubject = new BehaviorSubject<IError>({hasOccurred: false})

  user$: Observable<IUserData | null> = this.userSubject.asObservable();
  userError$: Observable<IError> = this.userErrorSubject.asObservable();

  constructor(private userService: UserService, private router: Router) { }

  async login(data: ILoginData) {
    this.userService.loginUser(data)
      .pipe(
        catchError(err => {
          return of(err.error)
        })
      )
      .subscribe(result => {
        debugger;
        if (result.loginSuccessful) {
          this.userSubject.next(result as IUserData);
          this.router.navigate(["/home"])
        } else {
          this.userErrorSubject.next({ hasOccurred: true, message: result.error })
        }
      })
  }
}
