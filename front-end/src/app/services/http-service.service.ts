import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(protected http: HttpClient) { 

  }

  apiUrl = "http://localhost:3000/"

  get(path) {
    return this.http.get(this.apiUrl+path).pipe()
  }

  post(path,data) {
    return this.http.post(this.apiUrl+path,data).pipe();
  }

  put(path,data) {
    return this.http.put(this.apiUrl+path,data).pipe()
  }

  delete(path) {
    return this.http.delete(this.apiUrl+path).pipe()
  }
}
