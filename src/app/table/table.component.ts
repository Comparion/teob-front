import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isWhileStatement } from 'typescript';
import { Post } from '../Post';
import { AccessService } from '../services/access/access.service';

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

  constructor(public _auth: AccessService) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  ngOnInit(): void {
    this.getPosts();
    //this.posts.forEach(obj => {obj.forEach(objChild => console.log(objChild.town, objChild.id))})

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
    if(this.town!='' || this.subject!='')
      this.posts = this._auth.getPosts(this.town, this.subject);
    else
      this.posts = this._auth.getPosts('','');
  }

}
