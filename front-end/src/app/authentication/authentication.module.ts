import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MatCardModule } from '@angular/material/card';
import { LogoutComponent } from './components/logout/logout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LibraryConfig } from './models/config';


@NgModule({ declarations: [
        LoginComponent,
        LogoutComponent
    ],
    exports: [
        LogoutComponent
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AuthenticationModule {
    static forRoot(config: LibraryConfig): ModuleWithProviders<AuthenticationModule> {
        return {
            ngModule: AuthenticationModule,
            providers: [{provide: 'config', useValue: config}]
        };
    }
}
