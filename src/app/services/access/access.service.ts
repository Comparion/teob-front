import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../User';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private _urlRegister = "http://localhost:8080/registration"
  private _urlLogin = "http://localhost:8080/login"

 
  constructor(private http: HttpClient) { }

  
  registerUser(user: User) {
    return this.http.post<any>(this._urlRegister, user);
  }

  loginUser(user: User) {
    let options = {
      responseType: 'text'
    };
  
    const res = this.http.post(this._urlLogin, user,{ responseType: 'text' });
    //console.log(res);
    return res;
    
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

}
