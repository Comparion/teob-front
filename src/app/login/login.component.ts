import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AccessService } from '../services/access/access.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDataLogin: User = new User
  invalidLogin = false

  constructor(public _auth: AccessService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.userDataLogin);
    this._auth.loginUser(this.userDataLogin)
    .subscribe(
    res => {console.log(res); 
      if(res == 'ok')
      {
        this.invalidLogin = true;
        sessionStorage.setItem('username', this.userDataLogin.username);
        this.router.navigateByUrl('/panel');
      }
    },
    err => {
    window.alert("Błędne dane do logowania/podany użytkownik nie istnieje.");
    this.invalidLogin = false;
    sessionStorage.removeItem('username');
    }
    )
  }
}
