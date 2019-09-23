import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Contact } from "../contact";
import { ContactSearchService } from "../contact-search.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-new-component",
  templateUrl: "./new-component.component.html",
  styleUrls: ["./new-component.component.css"]
})
export class NewComponentComponent implements OnInit {
  contactRes: Contact;
  _subscription: Subscription;

  constructor(private ContactSearch: ContactSearchService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const formValues = Object.assign({}, form.value);
    //console.log(formValues);
    //console.log(form.controls.lastName.value);
    //console.log(form.controls.address.value);
    //this.contact.name = form.controls.firstName.value;
    //this.contact.address = form.controls.address.value;
    //console.log(this.contact);
    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName} `,
      address: formValues.address,
      phone: "012345",
      photoUrl: "help.com "
    };
    console.log(contact);

    this._subscription = this.ContactSearch.newContact(contact).subscribe(
      response => {
        this.contactRes = response;
        alert(this.contactRes.name.toString() + "added");
      }
    );
  }
}
