import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ISavedPatternResult, INewPattern, ISavedPatternList } from '../interfaces/IPattern';

@Injectable()
export class ApiService {

   private BACKEND_URL = window.location + 'api/';

  constructor(private http: HttpClient) { }

  public getNextState(currentState: boolean[][] ): Observable<boolean[][]> {
    return this.http.post<boolean[][]>(this.BACKEND_URL + 'calculate-next-generation',
     currentState);
  }

  public getPatternNames(): Observable<ISavedPatternList[]> {
    return this.http.get<ISavedPatternList[]>(this.BACKEND_URL + 'list-patterns-name');
  }

  public getPatternByName(patternName?: string, id?: string): Observable<ISavedPatternResult> {
    let params = new HttpParams();
    !id && patternName && (params = params.append('patternName', patternName));
    id && (params = params.append('id', id));
    return this.http.get<ISavedPatternResult>(this.BACKEND_URL + 'get-pattern', { params: params });
  }

  public savePattern(pattern: INewPattern): Observable<INewPattern> {
    return this.http.post<INewPattern>(this.BACKEND_URL + 'save-pattern', pattern);
  }

}
