import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { CreatePersonComponent } from './create-person/create-person.component';


const routes: Routes = [
  {path: '', component: PeopleComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'create-person', component: CreatePersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
