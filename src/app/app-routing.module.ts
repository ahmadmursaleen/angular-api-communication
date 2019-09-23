import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { NewComponentComponent } from "./new-component/new-component.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "contacts",
    pathMatch: "full"
  },
  {
    path: "contacts",
    component: ContactListComponent
  },
  {
    path: "newcontact",
    component: NewComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
