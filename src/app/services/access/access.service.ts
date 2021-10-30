import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../User';
import { Post } from '../../Post';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private _urlRegister = "http://localhost:8080/registration"
  private _urlLogin = "http://localhost:8080/login"
  private _urlDelete = "http://localhost:8080/delete/"
  private _urlPosts = "http://localhost:8080/getposts"
  posts: Post[] = [];

 
  constructor(private http: HttpClient) { }

  
  registerUser(user: User) {
    return this.http.post<any>(this._urlRegister, user);
  }

  // deleteUser(user: String) {
  //   //this._urlDelete = this._urlDelete + user
  //   return this.http.delete(this._urlDelete + user)
  // }

  loginUser(user: User) {
    let options = {
      responseType: 'text'
    };
  
    const res = this.http.post(this._urlLogin, user,{ responseType: 'text' });
    //console.log(res);
    return res;
    
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  getPosts(){
    return this.http.get<Post[]>(this._urlPosts).pipe(
      map(posts => {
        this.posts = posts;
        return posts;
      })

    )
  }

  // getPosts(){
  //   const ret = this.http.get<Post[]>(this._urlPosts);
  //   //ret.forEach(console.log)
  //   //console.log("GET POSTS" + ret)
  //   return ret;
  // }

}
