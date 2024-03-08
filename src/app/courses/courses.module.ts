import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap
} from '@ngrx/data';

import { HomeComponent } from './ui/components/home/home.component';
import { CoursesCardListComponent } from './ui/components/courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './ui/components/edit-course-dialog/edit-course-dialog.component';
import { CoursesHttpService } from './infrastructure/courses-http.service';
import { CourseComponent } from './ui/components/course/course.component';

import { compareCourses } from './domain/model/course';

import * as fromCourses from './domain/reducers';
import { CoursesEntityService } from './infrastructure/courses-entity.service';
import { CoursesResolver } from './infrastructure/courses-resolver.service';
import { CoursesDataService } from './infrastructure/courses-data.service';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      Courses: CoursesResolver
    }
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
      Courses: CoursesResolver
    }
  }
];

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes)
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  providers: [CoursesHttpService, CoursesEntityService, CoursesDataService]
})
export class CoursesModule {
  constructor(
    private edb: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService
  ) {
    edb.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Course', coursesDataService);
  }
}
