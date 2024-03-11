import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Course } from '../domain/model/course';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenerator);
  }

  getAll() {
    return this.http.get('/api/courses').pipe(map((res) => res['payload']));
  }
}
