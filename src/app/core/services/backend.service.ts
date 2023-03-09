import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, shareReplay } from 'rxjs';
import { RescueCard, RescueDataSheet } from '../interfaces/rescue-data-sheets.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  search(val:string):Observable<RescueDataSheet> {
    return this.http.get<RescueDataSheet>(`/api/${val}`).pipe(
      map(data => data),
      shareReplay()
    )
  }
}
