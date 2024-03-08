import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';

import { CoursesActions } from '../domain/courses-types';

@Injectable()
export class CoursesResolverService implements Resolve<any> {
  private store: Store = inject(Store);
  private loading = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(CoursesActions.loadAllCourses());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
