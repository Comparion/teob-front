import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private _urlRegister = "http://localhost:8080/users"
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>(this._urlRegister, user);
  }
}
