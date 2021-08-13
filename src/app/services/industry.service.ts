import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IndustryCreateModel, Industry } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  private industryBaseUrl = (environment as any).industryBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  createIndustry(data: IndustryCreateModel): Observable<Industry> {
    return this.http.post<any>(this.industryBaseUrl + '/create', data).pipe(map(res => {
      return new Industry(res.result);
    }));
  }

  getAllIndustry(): Observable<Industry[]> {
    return this.http.get<any>(this.industryBaseUrl).pipe(map(res => res.result.map((industry: Industry) => {
      return new Industry(industry);
    })));
  }
}
