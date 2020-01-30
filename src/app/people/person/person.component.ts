import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person, WithPersonId } from '../people.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  @Input() person: WithPersonId<Person>;
  @Input() isActive: boolean;
  @Output() selectPerson: EventEmitter<Person> = new EventEmitter<WithPersonId<Person>>();
  @Output() deletePerson: EventEmitter<Person> = new EventEmitter<WithPersonId<Person>>()

  onSelectPerson() {
    this.selectPerson.emit(this.person);
  }

  onDeletePerson() {
    this.deletePerson.emit(this.person);
  }
}
