import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverrideAuthHeadersInterceptor } from './override-auth-headers-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: OverrideAuthHeadersInterceptor, multi: true },
];
