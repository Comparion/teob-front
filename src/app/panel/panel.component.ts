import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access/access.service';
import { DetailService } from '../services/detail/detail.service';
import { UserDetail } from '../UserDetail';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
  countryForm: FormGroup;
  gender: String;

  genderList = [
    {key: ' ', value: " " },
    {key: 'M', value: "Mężczyzna" },
    {key: 'K', value: "Kobieta" }
]

  constructor(public _auth: AccessService, public _detail: DetailService, private modalService: NgbModal, private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.detail()
  }

    delete(){
    this.currentUser = sessionStorage.getItem('username') || '{}'
    this._detail.deleteUser(this.currentUser)
    .subscribe()
    sessionStorage.removeItem('username');
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
    //console.log("Płeć: " + this.gender);
    //console.log("Płeć: " + userD.gender);
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
