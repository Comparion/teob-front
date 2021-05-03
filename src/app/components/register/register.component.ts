import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  email: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  registerUser(valueUsername:string, valuePass: string, valueEmail:string) {
    this.username = valueUsername;
    this.password = valuePass;
    this.email = valueEmail;
    fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        email: this.email,
                    })
                  })
  }

}
