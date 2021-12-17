import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isWhileStatement } from 'typescript';
import { Interest } from '../Interest';
import { Post } from '../Post';
import { CommentPost } from '../CommentPost';
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
  interests:  Observable<Interest[]>;
  comments:  Observable<CommentPost[]>;
  postSend: Post = new Post;
  town: string = ''
  subject = ''
  currentUser = '';
  interest: Interest = new Interest;
  commentPost: CommentPost = new CommentPost;
  closeResult = '';
  userdetail: UserDetail;
  commentContents = '';

  constructor(public _auth: AccessService, private modalService: NgbModal, public _detail: DetailService) { }

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

  getComments(idPost: BigInteger){
    this.comments = this._auth.getComments(idPost);
    this.comments.forEach(obj => {obj.forEach(objChild => console.log(objChild.firstName, objChild.secondName, objChild.username, objChild.idComment, objChild.idPost, objChild.contents))})
  
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

  addComment(){
    //console.log("too " + idPost)
    this.currentUser = sessionStorage.getItem('username') || '{}';
    this.commentPost.username = this.currentUser;
    //this.commentPost.idPost = idPost;
    this.commentPost.contents = this.commentContents;
    console.log(this.commentPost.idPost, this.commentPost.username)
    this._auth.addComment(this.commentPost).subscribe(
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


  getUserDetail(username: String){
    this._detail.detailUser(username)
    .subscribe(
      response => this.userdetail=response
    )
    console.log(this.userdetail)
  }

  deleteComment(idComment: BigInteger){
    this._auth.deleteComment(idComment)
    .subscribe(
      res => {console.log(res), window.location.reload();}, 
      err => console.log(err)
    );
  }
}
