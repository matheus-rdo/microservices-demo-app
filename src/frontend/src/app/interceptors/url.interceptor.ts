import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { EnvService } from '../env.service';


@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    constructor(
        public env: EnvService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const LOCAL_RESOURCES_URL = 'assets/';

        // local URL
        if (!req.url.startsWith(LOCAL_RESOURCES_URL) && !req.url.startsWith('/' + LOCAL_RESOURCES_URL) && this.env.apiUrl) {
            const url = this.env.apiUrl;
            req = req.clone({
                url: url + req.url,
            });
        }

        return next.handle(req);
    }
}
