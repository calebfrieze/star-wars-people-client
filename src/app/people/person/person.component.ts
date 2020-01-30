import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../people.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  @Input() person: Person;
  @Input() isActive: boolean;
  @Output() selectPerson: EventEmitter<Person> = new EventEmitter<Person>();

  onSelectPerson() {
    this.selectPerson.emit(this.person);
  }
}
