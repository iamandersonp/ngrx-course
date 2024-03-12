import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import {
  EntityDefinitionService,
  EntityDataService,
  EntityMetadataMap
} from '@ngrx/data';

import { authGuard } from './auth/infrastructure/auth.guard';

import { AuthService } from './auth/infrastructure/auth.service';
import { CoursesResolver } from './courses/infrastructure/courses-resolver.service';
import { CoursesDataService } from './courses/infrastructure/courses-data.service';
import { CoursesEntityService } from './courses/infrastructure/courses-entity.service';
import { CoursesHttpService } from './courses/infrastructure/courses-http.service';
import { LessonEntityService } from './courses/infrastructure/lesson-entity.service';
import { compareCourses } from './courses/domain/model/course';
import { compareLessons } from './courses/domain/model/lesson';

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Lesson: {
    sortComparer: compareLessons
  }
};

export const routes: Routes = [
  {
    path: '',
    providers: [AuthService],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth/ui/login.component').then((m) => m.LoginComponent)
      }
    ]
  },
  {
    path: 'courses',
    canActivate: [authGuard],
    providers: [
      CoursesHttpService,
      CoursesEntityService,
      LessonEntityService,
      CoursesDataService,
      {
        provide: ENVIRONMENT_INITIALIZER,
        useValue() {
          const edb: EntityDefinitionService = inject(EntityDefinitionService);
          const entityDataService = inject(EntityDataService);
          const coursesDataService = inject(CoursesDataService);
          edb.registerMetadataMap(entityMetadata);
          entityDataService.registerService('Course', coursesDataService);
        },
        multi: true
      }
    ],
    resolve: {
      Courses: CoursesResolver
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./courses/ui/components/home/home.component').then(
            (m) => m.HomeComponent
          )
      },
      {
        path: ':courseUrl',
        loadComponent: () =>
          import('./courses/ui/components/course/course.component').then(
            (m) => m.CourseComponent
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
