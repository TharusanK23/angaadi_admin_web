import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/auth-services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angaadi-web';

  constructor(
    private token: TokenService,
    private navigateRoute: Router,
  ) {
    if (this.token.loggedIn()) {
      this.navigateRoute.navigate(['/home']);
    } else {
      this.navigateRoute.navigate(['/auth/login']);
    }
  }
}
