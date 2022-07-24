import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {map, Observable} from 'rxjs';
import {UserStore} from "./stores/user.store";
import {IUserData} from "./interfaces/IUserData";
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userStore: UserStore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userStore.updateAutomaticLogOutTime()) {
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
}
