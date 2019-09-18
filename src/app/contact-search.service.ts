import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "./contact";

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
}
