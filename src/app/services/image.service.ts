import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(data: any): Observable<Image> {
    return this.http.post<any>(environment.imageBaseUrl + 'upload', data).pipe(map(res => {
      return new Image(res.result);
    }));
  }
}
