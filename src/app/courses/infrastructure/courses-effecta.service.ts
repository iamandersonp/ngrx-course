import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { CoursesActions } from '../domain/courses-types';
import { CoursesHttpService } from './courses-http.service';

@Injectable()
export class CoursesEffectaService {
  private actions$: Actions = inject(Actions);
  private coursesHttpService = inject(CoursesHttpService);
  loadCoursea$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      map((courses) => CoursesActions.AllCoursesLoaded({ courses }))
    );
  });
}
