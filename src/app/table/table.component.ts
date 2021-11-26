import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isWhileStatement } from 'typescript';
import { Interest } from '../Interest';
import { Post } from '../Post';
import { AccessService } from '../services/access/access.service';;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  posts: Observable<Post[]>;
  interests:  Observable<Interest[]>;
  postSend: Post = new Post;
  town: string = ''
  subject = ''
  currentUser = '';
  interest: Interest = new Interest;
  closeResult = '';

  constructor(public _auth: AccessService, private modalService: NgbModal) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
    
}

  ngOnInit(): void {
    this.getPosts();
    //this.posts.forEach(obj => {obj.forEach(objChild => console.log(objChild.town, objChild.id, Object.keys(objChild.interests).length))})

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

 
  wyszukaj(){
    this.getPosts();
    //window.location.reload();
  }
  
  getPosts(){
    this.currentUser = sessionStorage.getItem('username') || '{}';
    this.posts = this._auth.getPosts(this.town, this.subject, this.currentUser);
  }

  getInterests(idPost: BigInteger){
    this.interests = this._auth.getInterests(idPost);
    //console.log(this.interests.forEach.)
    //this.interests.forEach(obj => {obj.forEach(objChild => console.log(objChild.firstName, objChild.secondName, objChild.username))})
  
  }

  policz(post: Post){
    console.log(post);
    return (post.interests.forEach).length;
  }

  addInterest(idPost: BigInteger){
    this.currentUser = sessionStorage.getItem('username') || '{}';
    this.interest.username = this.currentUser;
    this.interest.idPost = idPost;
    console.log(this.interest.idPost, this.interest.username)
    this._auth.addInterest(this.interest).subscribe(
      res => {console.log(res), window.location.reload();}, 
      err => console.log(err)
    );
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
