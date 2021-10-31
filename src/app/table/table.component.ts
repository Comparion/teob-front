import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  currentUser = '';

  constructor(public _auth: AccessService) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  ngOnInit(): void {
    this.getPosts();
    //this.posts.forEach(obj => {obj.forEach(objChild => console.log(objChild.town))})

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
  
  getPosts(){
    this.posts = this._auth.getPosts();
  }

}
