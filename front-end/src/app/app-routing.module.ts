import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from "./user/user.component";
import { LoginComponent } from './authentication/components/login/login.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RoleGuard } from './authentication/guards/role.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ROLE } from './role.enum';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard, RoleGuard], data: {expectedRole: ROLE.ADMIN}},
  {path: 'user', component: UserComponent, canActivate: [AuthenticationGuard, RoleGuard], data: {expectedRole: ROLE.USER}},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
