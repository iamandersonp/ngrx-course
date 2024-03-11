import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';

import { Course } from '../../../domain/model/course';
import { Lesson } from '../../../domain/model/lesson';

import { CoursesEntityService } from '../../../infrastructure/courses-entity.service';
import { LessonEntityService } from '../../../infrastructure/lesson-entity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  private coursesService: CoursesEntityService = inject(CoursesEntityService);
  private lessonsService: LessonEntityService = inject(LessonEntityService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  loading$: Observable<boolean>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.coursesService.entities$.pipe(
      map((courses) => courses.find((course) => course.url === courseUrl))
    );

    this.lessons$ = this.lessonsService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lessons, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId === course.id)
      )
    );
    this.loading$ = this.lessonsService.loading$.pipe(delay(0));
  }

  loadLessonsPage(course: Course) {
    this.lessonsService.getWithQuery({
      courseId: course.id,
      pageNumber: this.nextPage
    });
    this.nextPage++;
  }
}
