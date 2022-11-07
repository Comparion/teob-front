import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Post';
import { AccessService } from '../services/access/access.service';;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DetailService } from '../services/detail/detail.service';
import { UserDetail } from '../UserDetail';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  posts: Observable<Post[]>;
  postSend: Post = new Post;
  town: string = ''
  subject = ''
  currentUser = '';
  closeResult = '';
  userdetail: UserDetail;
  commentContents = '';
  editPanel = false;
  postModal: Post = new Post;

  constructor(public _auth: AccessService, private modalService: NgbModal, public _detail: DetailService) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
    
}

  ngOnInit(): void {
    this.getPosts();
  }

  dodaj(post: Post){
    this.currentUser = sessionStorage.getItem('username') || '{}';
    post.username = this.currentUser;
    console.log(post)
    this._auth.addPost(post).subscribe(
      res => {console.log(res), window.location.reload();}, 
      err => console.log(err)
    );
  }

  saveModal(post: Post){
    this.postModal = post
  }

  wyszukaj(){
    this.getPosts();
  }
  
  getPosts(){
    this.currentUser = sessionStorage.getItem('username') || '{}';
    this.posts = this._auth.getPosts(this.town, this.subject, this.currentUser);
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


  getUserDetail(username: String){
    this._detail.detailUser(username)
    .subscribe(
      response => this.userdetail=response
    )
    console.log(this.userdetail)
  }

  edit(){
    this.editPanel = true;
  }

  save(post: Post){
    this.editPanel = false;
    this._auth.updatePost(post)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }


}
