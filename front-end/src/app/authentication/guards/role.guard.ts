import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
      constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getLoggedUser();
        const expectedRole = route.data.expectedRole;
        if (currentUser.token === expectedRole) {
            return true;
        }

        this.router.navigate(['/',currentUser.username]);
        return false;
    }
}
