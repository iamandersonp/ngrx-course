import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { Course } from '../../../domain/model/course';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

import { CoursesEntityService } from '../../../infrastructure/courses-entity.service';
import { AsyncPipe } from '@angular/common';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CoursesCardListComponent,
    AsyncPipe
  ]
})
export class HomeComponent implements OnInit {
  private dialog: MatDialog = inject(MatDialog);
  private coursesService: CoursesEntityService = inject(CoursesEntityService);
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.coursesService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'BEGINNER')
      )
    );

    this.advancedCourses$ = this.coursesService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'ADVANCED')
      )
    );

    this.promoTotal$ = this.coursesService.entities$.pipe(
      map((courses) => courses.filter((course) => course.promo).length)
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
