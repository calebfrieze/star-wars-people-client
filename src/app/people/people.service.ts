import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  httpOptions = { headers: this.headers }

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  createPerson = (person: Person) => this.http.post<PersonApiResponse>(config.peopleApiUrl, person, this.httpOptions);

  getPeople = () => this.http.get<PeopleApiResponse>(config.peopleApiUrl, this.httpOptions);

  updatePerson = (personId: number, person: Person) =>
    this.http.put<PersonApiResponse>(`${config.peopleApiUrl}/${personId}`, person, this.httpOptions)

  refreshPeople = (pageLimit?: number) => {
    const urlParams = querystring.stringify({
      page_limit: pageLimit
    });
    return this.http.get(`${config.refreshPeopleApiUrl}?${urlParams}`, this.httpOptions);
  }

  deletePerson = (personId: number) => this.http.delete(`${config.peopleApiUrl}/${personId}`)
}
