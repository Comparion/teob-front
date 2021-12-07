import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AccessService } from '../services/access/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userDataRegister: User = new User;
  supportPass = "";

  constructor(private _auth: AccessService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (this.userDataRegister.password == this.supportPass) {
      this._auth.registerUser(this.userDataRegister)
        .subscribe(
          res => {
            //console.log(res);
            if (res == 'ok') {
              window.alert("Zarejestrowano użytkownika.");
              this.router.navigateByUrl('/login');
            }
          },
         err => {window.alert("Podany nazwa użytkownika/email są już zajęte.");}//console.log(err),
        )
    } else {
      window.alert("Podane hasła nie są identyczne.")
    }
  }
}
