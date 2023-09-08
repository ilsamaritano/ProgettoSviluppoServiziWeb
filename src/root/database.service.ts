import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class ArchivioService {
  key: string = 'f91a18be';
  base: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';

  constructor() {}

  // Ottieni dati tramite richiesta GET
  public getData(): Observable<any> {
    return ajax({
      method: 'GET',
      url: this.base + '/get?key=' + this.key,
      crossDomain: true,
    });
  }

  // Invia i dati tramite POST
  public sendData(json: string): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.base + '/set?key=' + this.key,
      crossDomain: true,
      body: json,
    });
  }
}
