import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../../domain/model/course';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

import { Store } from '@ngrx/store';
import { CoursesSelectors } from '../../../domain/courses-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private dialog: MatDialog = inject(MatDialog);
  private store: Store = inject(Store);

  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.promoTotal$ = this.store.select(CoursesSelectors.selectPromoTotal);

    this.beginnerCourses$ = this.store.select(
      CoursesSelectors.selectBeginnerCourses
    );

    this.advancedCourses$ = this.store.select(
      CoursesSelectors.selectAdvancedCourses
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
