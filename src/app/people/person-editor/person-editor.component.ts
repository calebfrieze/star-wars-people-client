import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Person, WithPersonId } from '../people.service';

export interface OnSaveEventPayload {
  personId: number;
  personBody: Person;
}

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnChanges, OnInit {
  @Input() person: WithPersonId<Person>;
  @Output() savePerson: EventEmitter<OnSaveEventPayload> = new EventEmitter<OnSaveEventPayload>();

  personEditorForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.fb = fb;
  }

  ngOnInit() {
    this.personEditorForm = this.fb.group({
      name: [this.person.name || '', Validators.required],
      height: [this.person.height || ''],
      mass: [this.person.mass || ''],
      hair_color: [this.person.hair_color || ''],
      skin_color: [this.person.skin_color || ''],
      eye_color: [this.person.eye_color || ''],
      birth_year: [this.person.birth_year || ''],
      gender: [this.person.gender || '']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.person && this.personEditorForm) {
      this.person = changes.person.currentValue;
      const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = this.person;
      this.personEditorForm.setValue({ name, height, mass, hair_color, skin_color, eye_color, birth_year, gender });
    }
  }

  onSavePerson() {
    this.savePerson.emit({ personId: this.person.person_id, personBody: this.personEditorForm.value });
  }
}
