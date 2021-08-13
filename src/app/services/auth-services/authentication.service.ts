import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(body: any): any {
    return this.http.post<any>(environment.authBaseUrl + 'login', body)
  }
}
