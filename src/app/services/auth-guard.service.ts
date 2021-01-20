import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  lognPass: boolean;
  constructor( private authService: AuthService) {}


  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }


  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //   console.log(route);

  //   let authInfo = {
  //     authenticated: this.lognPass
  //   };

  //   if (!authInfo.authenticated) {
  //     this.router.navigate(["login"]);
  //     return false;
  //   }else {
  //     this.router.navigate(["ss"]);
     
  //   }

  //   return true;
  // }
}
