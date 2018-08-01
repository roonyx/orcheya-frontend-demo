import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { UserLink } from '../models/userLinks';

@Injectable()
export class UserLinksService {
  private _apiUrl = '/api/user_links';

  constructor(private _http: HttpClient) {}

  public getUserLinks(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      return this._http
        .get(this._apiUrl)
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        })
    })
  }

  public newUserLinks(link: UserLink): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      return this._http
        .post(this._apiUrl, link)
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        })
    })
  }

  public updateUserLinks(link: UserLink): Observable<object> {
    return Observable.create((observer: Observer<object>) => {
      return this._http
        .put(`${this._apiUrl}/${link.id}`, link)
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        })
    })
  }

}
