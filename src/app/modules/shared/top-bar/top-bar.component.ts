import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth-services/token.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.tokenService.remove();
    window.location.href = '/auth/login';
  }
}
