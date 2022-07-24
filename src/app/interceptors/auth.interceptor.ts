import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable} from "rxjs";
import {UserStore} from "../stores/user.store";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userStore: UserStore) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.userStore.getToken());
    const request = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'authorization': this.userStore.getToken(),
      },
    });

    return next.handle(request);
  }
}
