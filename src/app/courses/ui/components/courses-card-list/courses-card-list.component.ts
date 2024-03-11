import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../../domain/model/course';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { CoursesEntityService } from '../../../infrastructure/courses-entity.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  standalone: true,
  imports: [NgFor, MatCardModule, MatButtonModule, RouterLink, MatIconModule]
})
export class CoursesCardListComponent {
  @Input() courses: Course[];
  @Output() courseChanged = new EventEmitter();
  private dialog: MatDialog = inject(MatDialog);
  private coursesService: CoursesEntityService = inject(CoursesEntityService);

  constructor() {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update'
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    this.coursesService.delete(course.id);
  }
}
