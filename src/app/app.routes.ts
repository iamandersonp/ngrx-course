import { Routes } from '@angular/router';

import { authGuard } from './auth/infrastructure/auth.guard';

import { AuthService } from './auth/infrastructure/auth.service';

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
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
