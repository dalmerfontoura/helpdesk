import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    public shared: SharedService;

    constructor(private router: Router) {
        this.shared = SharedService.getInstance();
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.shared.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
