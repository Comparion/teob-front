import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserDetail } from '../../UserDetail';
import { User } from '../../User';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private _urlDelete = "http://localhost:8080/delete/"
  private _urlDetail = "http://localhost:8080/detail/"
  private _urlUpdate = "http://localhost:8080/updatedetail/"

  constructor(private http: HttpClient) { }

  deleteUser(user: String) {
    this._urlDelete = this._urlDelete + user
    return this.http.delete(this._urlDelete )
  }

  detailUser(user: String) : Observable<UserDetail> {
    return this.http.get<UserDetail>(this._urlDetail + user)
  }

  updateUser(username: String, userDetail: UserDetail) {
    return this.http.put(this._urlUpdate + username,userDetail, { responseType: 'text' });
  }

}
