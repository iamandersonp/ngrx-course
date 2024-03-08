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
import { Course } from '../model/course';
import { CoursesActions } from '../courses-types';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {}

export const courseAdapter = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState =
  courseAdapter.getInitialState();

export const reducers: ActionReducer<CoursesState, Action> = createReducer(
  initialCoursesState,
  on(CoursesActions.AllCoursesLoaded, (state, action) =>
    courseAdapter.setAll(action.courses, state)
  )
);

export const metaReducers: MetaReducer<CoursesState>[] = isDevMode() ? [] : [];
