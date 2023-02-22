import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private api = 'https://mailthis.to/Alesya';

  constructor(private http: HttpClient) {}

  postEmail(email: string) {
    return this.http.post(this.api, email, {
      responseType: 'text',
    });
  }
}
