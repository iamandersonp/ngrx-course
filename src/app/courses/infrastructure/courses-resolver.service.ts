import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';

import { CoursesActions, CoursesSelectors } from '../domain/courses-types';

@Injectable()
export class CoursesResolverService implements Resolve<any> {
  private store: Store = inject(Store);
  private loading = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(CoursesSelectors.selectAreCoursesLoaded).pipe(
      tap((coursesLoaded) => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(CoursesActions.loadAllCourses());
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
