import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AccessService } from '../services/access/access.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userDataRegister: User = new User;
  supportPass = "";
  siteKey = "6LfdopkdAAAAANavouhcSDZtaDiy30dL6G1ZBLfy";
  registerForm: UntypedFormGroup;

  constructor(private _auth: AccessService, private router: Router, private formBuilder: UntypedFormBuilder) {}


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      supportPass: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }



  register() {
    console.log(this.registerForm.value.captcha);
    if(this.registerForm.value.captcha!=""){
    if (this.userDataRegister.password == this.supportPass) {
      this._auth.registerUser(this.userDataRegister)
        .subscribe(
          res => {
            if (res == 'ok') {
              window.alert("Zarejestrowano użytkownika.");
              this.router.navigateByUrl('/login');
            }
          },
         err => {window.alert("Podany nazwa użytkownika/email są już zajęte.");}
        )
    } else {
      window.alert("Podane hasła nie są identyczne.")
    }
  } else {
    window.alert("Pole nie jestem robotem nie jest zaznaczone.")
  }
  }
}
