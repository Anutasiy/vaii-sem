import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import {Course} from '../../courses-update/courses-update.component';


@Injectable({ providedIn: 'root' })
export class DataStorageService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
        return next.handle(modifiedRequest);
      })
    );
  }
}
