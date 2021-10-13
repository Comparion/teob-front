import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserDetail } from '../../UserDetail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private _urlDelete = "http://localhost:8080/delete/kasia"
  private _urlDetail = "http://localhost:8080/detail/"

  constructor(private http: HttpClient) { }

  deleteUser(user: String) {
    //this._urlDelete = this._urlDelete + user
    return this.http.delete(this._urlDelete )
  }

  detailUser(user: String) : Observable<UserDetail> {
    return this.http.get<UserDetail>(this._urlDetail + user)
  }
}
