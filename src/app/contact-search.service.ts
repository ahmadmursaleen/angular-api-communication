import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "./contact";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ContactSearchService {
  contacts: Observable<Contact>;

  constructor(private http: HttpClient) {}

  getContact: Function = (): Observable<Contact> => {
    this.contacts = this.http.get<Contact>(
      "http://localhost:3000/api/contacts"
    );
    return this.contacts;
  };

  newContact: Function = (contact: Contact): Observable<Contact> => {
    return this.http.post<Contact>(
      //'http://127.0.0.1:5000/recengine',
      "http://localhost:3000/api/contacts",
      //'http://35.246.175.44/recengine',
      contact,
      httpOptions
    );
  };
}
