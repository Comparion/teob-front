import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access/access.service';
import { DetailService } from '../services/detail/detail.service';
import { UserDetail } from '../UserDetail';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  currentUser = ''
  userdetail: UserDetail;
  editPanel = false;
  closeResult = '';


  constructor(public _auth: AccessService, public _detail: DetailService, private modalService: NgbModal) {
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

  edit(){
    this.editPanel = true;
  }

  save(userD: UserDetail){
    console.log(userD)
    this.editPanel = false;
    this._detail.updateUser(this.currentUser,userD)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    //console.log(this.userdetail)
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
