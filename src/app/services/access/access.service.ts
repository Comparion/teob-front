import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../User';
import { Post } from '../../Post';
import { map } from 'rxjs/operators';
import { UserDetail } from 'src/app/UserDetail';


@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private _urlRegister = "http://localhost:8080/registration"
  private _urlLogin = "http://localhost:8080/login"
  private _urlPosts = "http://localhost:8080/posts"
  private _urlFind = "http://localhost:8080/finduser"
  private _urlSuggestions = "http://localhost:8080/suggestionsuser"
  private _urlUpdatePost = "http://localhost:8080/updatepost"
  posts: Post[] = [];
  users: UserDetail[] = [];
  comments: Comment[] = []

 
  constructor(private http: HttpClient) { }

  
  registerUser(user: User) {
    return this.http.post(this._urlRegister, user,{ responseType: 'text' });
  }

  loginUser(user: User) {
    let options = {
      responseType: 'text'
    };
  
    const res = this.http.post(this._urlLogin, user,{ responseType: 'text' });
    return res;
    
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  getPosts(town: String, subject: String, username: String){
    let urlPosts =  this._urlPosts + '?username=' + username;
    if(town!=''&&subject!=''){
      urlPosts=urlPosts+'&town='+town+'&subject='+ subject;
    } else if(town!=''){
      urlPosts=urlPosts+'&town='+town
    } else if(subject!=''){
      urlPosts=urlPosts+'&subject='+subject
    }
    return this.http.get<Post[]>(urlPosts).pipe(
      map(posts => {
        this.posts = posts;
        return posts;
      })

    )
  }

  findUsers(username: String, likes: String){
    let urlFind =  this._urlFind;
    if(username != '' && likes!=''){
      urlFind=urlFind+'?username='+username+'&likes='+ likes;
    }else if(username != ''){
      urlFind=urlFind+'?username='+username
    } else if(likes!=''){
      urlFind=urlFind+'?likes='+likes
    } 
    return this.http.get<UserDetail[]>(urlFind).pipe(
      map(users => {
        this.users = users;
        return users;
      })

    )
  }

  suggestionsUsers(username: String){
    let urlSuggestions =  this._urlSuggestions;
    if(username != ''){
      urlSuggestions=urlSuggestions+'?username='+username
    }
    return this.http.get<UserDetail[]>(urlSuggestions).pipe(
      map(users => {
        this.users = users;
        return users;
      })

    )
  }


  addPost(post: Post){
    return this.http.post(this._urlPosts, post,{ responseType: 'text' });
  }

  updatePost(post: Post){
    return this.http.put(this._urlUpdatePost, post, { responseType: 'text' });
  }

}
