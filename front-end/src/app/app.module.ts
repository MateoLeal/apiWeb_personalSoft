import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";

import { AuthenticationModule } from "./authentication/authentication.module";
import { MockBackendInterceptor } from "./mock-backend/mock-backend.interceptor";

export const AUTHENTICATION_CONFIG = {
    authEndpoint: "/users/authenticate",
    initialPage: "user"
};

@NgModule({ declarations: [
        AppComponent,
        AdminComponent,
        UserComponent,
        NotFoundComponent,
    ],
    bootstrap: [AppComponent], imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatTableModule,
        MatToolbarModule,
        AuthenticationModule.forRoot(AUTHENTICATION_CONFIG)], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockBackendInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
