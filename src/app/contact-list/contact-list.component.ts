import { Component, OnInit } from "@angular/core";
import { Contact } from "../contact";
import { ContactSearchService } from "../contact-search.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  contacts: Contact;
  _subscription: Subscription;

  constructor(private ContactSearch: ContactSearchService) {}

  ngOnInit() {
    this._subscription = this.ContactSearch.getContact().subscribe(response => {
      this.contacts = response;
    });
  }

  ngOnDestroy() {
    // unsubscribing from an observable
    // console.log('unsubscribing');
    this._subscription.unsubscribe();
  }
}
