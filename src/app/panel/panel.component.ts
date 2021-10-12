import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access/access.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  currentUser = ""

  constructor(public _auth: AccessService) { }

  ngOnInit(): void {
  }

    delete(){
    this.currentUser = sessionStorage.getItem('username') || '{}'
    this._auth.deleteUser(this.currentUser)
    .subscribe()
  }
}
