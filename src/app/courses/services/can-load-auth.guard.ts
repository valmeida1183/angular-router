import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthStore } from "../../services/auth.store";
import { first, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class CanLoadAuthGuard implements CanLoad {
  constructor(private auth: AuthStore, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.isLoggedIn$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
