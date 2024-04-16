import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  recommended() {
    return this.http
      .get(
        'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco'
      )
      .pipe(
        take(1),
        map((res: any) => {
          return res;
        })
      );
  }

  upcoming(pageNumber: number) {
    return this.http
      .get(
        'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=' +
          pageNumber +
          '&type=upcoming'
      )
      .pipe(
        take(1),
        map((res: any) => {
          return res;
        })
      );
  }
}
