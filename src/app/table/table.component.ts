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

  constructor(public _auth: AccessService) { }

  ngOnInit(): void {
    this.posts = this._auth.getPosts();
    //this.posts.forEach(obj => {obj.forEach(objChild => console.log(objChild.town))})

  }

}
