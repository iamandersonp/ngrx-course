import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { CoursesEntityService } from './courses-entity.service';

export const CoursesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesService: CoursesEntityService = inject(CoursesEntityService);
  return coursesService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        coursesService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};

