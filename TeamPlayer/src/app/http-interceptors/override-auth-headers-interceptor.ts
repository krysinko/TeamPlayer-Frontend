import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class OverrideAuthHeadersInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorizationData: string = 'Basic ' + btoa('admin:password');

        req = req.clone({
            setHeaders: {
                'Content-Type':  'application/json',
                'Authorization': authorizationData,
            },
        });

        return next.handle(req);
    }
}
