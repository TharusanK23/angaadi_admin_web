import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }


  handle(token: string): void {
    // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7InVzZXJJZCI6IjYwZmFjYWE1YTlhNzdiYjcyNjQ1NzA3MSIsImN1c3RvbWVySWQiOiI2MGZhY2FhNWE5YTc3YmI3MjY0NTcwNzEiLCJmaXJzdF9uYW1lIjoiVGhhcnVzYW4iLCJsYXN0X25hbWUiOiJUaGFydSIsImVtYWlsIjoidGhhcnVzYW4uc3R1ZHlAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiKzk0NzcxMDAwNTE2IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJUd29GYWN0b3IiOnRydWV9LCJpYXQiOjE2Mjc5MjMyODgsImV4cCI6MTYyODUyODA4OCwiYXVkIjoiNjBmYWNhYTVhOWE3N2JiNzI2NDU3MDcxIiwiaXNzIjoidGhhcnVzYW4udGsifQ.laPhsIc3cpB9AaFUEcJZBSERwlOvUU6BefA7t3BMohg';
    this.set(token);
  }


  set(token: string): void {
    localStorage.setItem('token', token);
  }


  get(): any {
    return localStorage.getItem('token');
  }


  getClientToken(): any {
    return localStorage.getItem('clientToken');
  }


  remove(): any {
    localStorage.removeItem('token');
  }


  isValid(): boolean {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return (payload.iss === 'UCDP' || payload.iss === 'tharusan.tk') ? true : false;
      }
    }
    return false;
  }


  payload(token: string): any {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }


  decode(payload: string): void {
    return JSON.parse(atob(payload));
  }


  loggedIn(): boolean {
    return this.isValid();
  }
}
