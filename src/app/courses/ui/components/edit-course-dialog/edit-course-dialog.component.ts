import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../../../domain/model/course';
import { CoursesEntityService } from '../../../infrastructure/courses-entity.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<EditCourseDialogComponent> =
    inject(MatDialogRef);
  private coursesService: CoursesEntityService = inject(CoursesEntityService);
  private data = inject(MAT_DIALOG_DATA);
  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$: Observable<boolean>;

  constructor() {
    this.dialogTitle = this.data.dialogTitle;
    this.course = this.data.course;
    this.mode = this.data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...this.data.course });
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    if (this.mode == 'update') {
      this.coursesService.update(course);
      this.dialogRef.close();
    } else if (this.mode == 'create') {
      this.coursesService.add(course).subscribe(
        () => {
          this.dialogRef.close();
        },
        (error) => {
          console.log('Error', error);
        }
      );
    }
  }
}
