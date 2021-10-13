import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access/access.service';
import { DetailService } from '../services/detail/detail.service';
import { UserDetail } from '../UserDetail';



@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  currentUser = ''
  userdetail: UserDetail;


  constructor(public _auth: AccessService, public _detail: DetailService) {
   }

  ngOnInit(): void {
    this.detail()
  }

    delete(){
    this.currentUser = sessionStorage.getItem('username') || '{}'
    this._detail.deleteUser(this.currentUser)
    .subscribe()
  }

  detail(){
    this.currentUser = sessionStorage.getItem('username') || '{}'
    this._detail.detailUser(this.currentUser)
    .subscribe(
      response => this.userdetail=response
    )
    console.log(this.userdetail)
  }
}
