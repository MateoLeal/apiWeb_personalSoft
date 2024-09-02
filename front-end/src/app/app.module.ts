import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationModule } from "./authentication/authentication.module";
import { MockBackendInterceptor } from "./mock-backend/mock-backend.interceptor";

export const AUTHENTICATION_CONFIG = {
  authEndpoint: "/users/authenticate",
  initialPage: "home"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    AuthenticationModule.forRoot(AUTHENTICATION_CONFIG)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    NotFoundComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
