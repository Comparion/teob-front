import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AccessService } from '../services/access/access.service';
//import { MessageBoxService } from 'tsc-ui';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userDataRegister: User = new User;
  //userDataRegister = {};

  // username: string = '';
  // password: string = '';
  // email: string = '';

  constructor(private _auth: AccessService) { }

  ngOnInit(): void {
  }

  register(){
    //this.userDataRegister({username: 'ere',email:'ggg',password:'ee'});
    //this.userDataRegister.username;
    //console.log(this.userDataRegister);
    this._auth.registerUser(this.userDataRegister)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  // registerUser(valueUsername:string, valuePass: string, valueEmail:string) {
  //   this.username = valueUsername;
  //   this.password = valuePass;
  //   this.email = valueEmail;
  //   fetch('http://localhost:8080/users', {
  //                   method: 'POST',
  //                   headers: {
  //                       'Accept': 'application/json',
  //                       'Content-Type': 'application/json',
  //                   },
  //                   body: JSON.stringify({
  //                       username: this.username,
  //                       password: this.password,
  //                       email: this.email,
  //                   })
  //                 }),(error: Http2ServerResponse) =>
  //                 {
  //                   console.log(error.statusCode);
  //                 }
  // }

}
