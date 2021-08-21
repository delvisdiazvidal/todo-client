import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../services/notification.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notifyService: NotificationService,
                private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if ([0].indexOf(err.status) !== -1) {
                const error = 'Ha ocurrido un Error en la Petición a la API';
                this.router.navigate(['503']);
                return throwError(error);
            }
            if ([404].indexOf(err.status) !== -1) {
                const error = err.error.message || err.statusText;
                console.error(err);
                console.error(error);
                this.router.navigate(['404']);
                return throwError(error);
            } else {
              const error = err.error.message || err.statusText;
              this.notifyService.showError('[Error: ' + err.status + '] - ' + error);
              return throwError(error);
            }
        }));

    }
}
