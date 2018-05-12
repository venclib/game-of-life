import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { IPattern } from '../interfaces/IPattern';

@Injectable()
export class ApiService {

  BACKEND_URL = window.location + "api/";

  constructor(private http: HttpClient) { }

  public getNextState(currentState: boolean[][] ): Observable<boolean[][]> {
    return this.http.post<boolean[][]>(this.BACKEND_URL + "calculate-next-generation",
     currentState);
  }

  public getPatternNames(): Observable<string[]> {
    return this.http.get<string[]>(this.BACKEND_URL + "get-patterns-name");
  }

  public getPatternByName(patternName: string): Observable<IPattern[]> {
    return this.http.get<IPattern[]>(this.BACKEND_URL + "get-pattern/name/" + patternName);
  }

}
