import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = (environment as any).authBaseUrl;
  constructor(
    private http: HttpClient
  ) { }

  login(body: any): any {
    return this.http.post<any>(this.baseUrl + 'login', body)
  }
}
