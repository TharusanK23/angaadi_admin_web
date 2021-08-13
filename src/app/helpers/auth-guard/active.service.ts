import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/auth-services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveService implements CanActivate {

  constructor(
    private token: TokenService
  ) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.token.loggedIn();
  }
}
