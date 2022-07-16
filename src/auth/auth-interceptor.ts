import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private username = 'username';
    private password = 'password';
    private encodedString = btoa(`${this.username}:${this.password}`);

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${this.authService.getKey()}`
            }
        });

        return next.handle(request);
    }

    public getKey() {
        return this.encodedString;
    }
}
