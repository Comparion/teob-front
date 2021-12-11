import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessService } from '../services/access/access.service';
import { User } from '../User';
import { UserDetail } from '../UserDetail';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: Observable<UserDetail[]>;
  firstname = ''
  secondname =''
  username =''

  constructor(public _auth: AccessService) { }

  ngOnInit(): void {
    this.wyszukajUzytkownikow();
  }

  wyszukajUzytkownikow(){
    this.users = this._auth.findUsers(this.firstname, this.secondname, this.username);
    //this.users.forEach(obj => {obj.forEach(objChild => console.log(objChild.firstName, objChild.secondName, objChild.username))})
  }

}
