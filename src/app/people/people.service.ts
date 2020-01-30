import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as querystring from 'querystring';
import * as config from '../../app/config.json';

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export type WithPersonId<T> = T & {
  person_id: number;
};

interface PeopleApiResponse {
  people: WithPersonId<Person>[];
}

interface PersonApiResponse {
  person: WithPersonId<Person>;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  createPerson = (person: Person) => this.http.post<PersonApiResponse>(config.peopleApiUrl, person,{ headers: { 'Content-Type': 'application/json' } });

  getPeople = () => this.http.get<PeopleApiResponse>(config.peopleApiUrl, { headers: { 'Content-Type': 'application/json' } });

  updatePerson = (personId: number, person: Person) =>
    this.http.put<PersonApiResponse>(`${config.peopleApiUrl}/${personId}`, person, { headers: { 'Content-Type': 'application/json' }})

  refreshPeople = (pageLimit?: number) => {
    const urlParams = querystring.stringify({
      page_limit: pageLimit
    });
    return this.http.get(`${config.refreshPeopleApiUrl}?${urlParams}`);
  }
}
