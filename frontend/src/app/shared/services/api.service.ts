import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  public getNextState(currentState: boolean[][] ): Observable<boolean[][]> {
    return this.http.post<boolean[][]>(window.location + "calculate-next-generation",
     currentState);
  }

}
