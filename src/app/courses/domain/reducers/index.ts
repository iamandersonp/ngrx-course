import { isDevMode } from '@angular/core';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { compareCourses, Course } from '../model/course';
import { CoursesActions } from '../courses-types';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const courseAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCoursesState: CoursesState = courseAdapter.getInitialState({
  allCoursesLoaded: false
});

export const reducers: ActionReducer<CoursesState, Action> = createReducer(
  initialCoursesState,
  on(CoursesActions.AllCoursesLoaded, (state, action) =>
    courseAdapter.setAll(action.courses, { ...state, allCoursesLoaded: true })
  )
);

export const { selectAll } = courseAdapter.getSelectors();

export const metaReducers: MetaReducer<CoursesState>[] = isDevMode() ? [] : [];
