import { Component, OnInit } from '@angular/core';
import { PeopleService, Person, WithPersonId } from './people.service';
import { OnSaveEventPayload } from './person-editor/person-editor.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const PEOPLE_PAGE_LIMIT = 2;

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: WithPersonId<Person>[];
  activePerson: WithPersonId<Person>;

  refreshingPeople: boolean = false;

  constructor(
    private peopleService: PeopleService,
    private snackBar: MatSnackBar
  ) {
    this.peopleService = peopleService;
  }

  ngOnInit() {
    const people = this.peopleService.getPeople();
    people.subscribe(data => this.people = data.people);
  }

  onSelect(person: WithPersonId<Person>) {
    this.activePerson = person;
  }

  onSavePerson({ personId, personBody }: OnSaveEventPayload) {
    this.peopleService.updatePerson(personId, personBody)
      .subscribe(data => {
        this.people = this.people.map(person =>
          Number(person.person_id) === Number(personId) ?
            data.person : person);
        this.snackBar.open(`${data.person.name} was saved!`, "dismiss", { duration: 3 * 1000 });
      });
  }

  onRefreshPeople() {
    this.refreshingPeople = true;
    this.peopleService.refreshPeople(PEOPLE_PAGE_LIMIT)
      .subscribe(data => {
        window.location.reload();
      });
  }

  onDeletePerson({ person_id }: WithPersonId<Person>) {
    this.peopleService.deletePerson(person_id)
      .subscribe(data => {
        this.people = this.people.filter(person => person.person_id !== person_id);
      });
  }
}
