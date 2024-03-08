import { createAction, props } from '@ngrx/store';
import { Course } from './model/course';

export const loadAllCourses = createAction(
  '[Courses Resolver] Load all courses'
);

export const AllCoursesLoaded = createAction(
  '[Load Courses Effect] All courses loaded',
  props<{ courses: Course[] }>()
);
