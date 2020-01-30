import { Component, OnInit } from '@angular/core';
import { Person, PeopleService } from '../people/people.service';
import { OnSaveEventPayload } from '../people/person-editor/person-editor.component';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {
  person: Person;

  personCreated: boolean = false;

  constructor(
    private peopleService: PeopleService
  ) {
    this.peopleService = peopleService;
  }

  ngOnInit() {
    this.person = {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: ''
    };
  }

  onSavePerson({ personBody }: OnSaveEventPayload) {
    this.peopleService.createPerson(personBody).subscribe(data => {
      this.personCreated = true;
    });
  }

  clearForm() {
    this.personCreated = false;
    this.person = {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: ''
    };
  }
}
