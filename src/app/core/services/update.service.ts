import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Update } from '../models/update';
import { UpdateFilter } from '../models/update-filter';
import { Meta } from '../models/meta.interface';

export interface UpdatesResponse {
  updates: Update[];
  meta: Meta;
}

@Injectable()
export class UpdateService {
  private apiUrl = '/api/updates';

  constructor(private http: HttpClient) {}

  getUpdates(filter?: UpdateFilter): Observable<UpdatesResponse> {
    let params: HttpParams;

    if (filter) {
      const obj = filter._toJSON() as { [param: string]: string | string[]; };

      for (const key in obj) {
        if (obj.hasOwnProperty(key) && !obj[key]) {
          delete(obj[key]);
        }
      }

      params = new HttpParams({
        fromObject: obj
      });
    } else {
      params = new HttpParams();
    }

    return Observable.create((observer: Observer<UpdatesResponse>) => {
      this.http
        .get(this.apiUrl, { params })
        .subscribe(
          (data: UpdatesResponse) => {
            const updates = data.updates
              .map(update => new Update(update));

            observer.next({
              updates,
              meta: data.meta,
            });
            observer.complete();
          },
          err => observer.error(err)
        );
    });
  }

}