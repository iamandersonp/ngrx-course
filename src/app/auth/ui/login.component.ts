import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../infrastructure/auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';

import { AuthActions } from '../domain/auth-types';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit() {
    console.log('LoginComponent initialized');
  }

  login() {
    const formValue = this.form.value;
    this.auth
      .login(formValue.email, formValue.password)
      .pipe(
        tap((user) => {
          console.log('User:', user);
          this.store.dispatch(AuthActions.loginAction({ user }));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(noop, () => alert('Login failed'));
  }
}
