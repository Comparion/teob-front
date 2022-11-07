import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessService } from '../services/access/access.service';
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
  likes =''
  currentUser = ''

  constructor(public _auth: AccessService) { }

  ngOnInit(): void {
    this.wyszukajUzytkownikow();
  }

  wyszukajUzytkownikow(){
    this.users = this._auth.findUsers(this.username, this.likes);
  }

  sugestieUzytkownikow(){
    this.currentUser = sessionStorage.getItem('username') || '{}'
    this.users = this._auth.suggestionsUsers(this.currentUser);
  }

}
