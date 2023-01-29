import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@pizza/interfaces';
import { AuthService } from '@pizza/services';
import { tap } from 'rxjs';

@Component({
  selector: 'pizza-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = this.fb.group({
    username: this.fb.control('test', [Validators.required]),
    password: this.fb.control('test', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(
    private fb: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth
      .login(this.form.value as Login)
      .pipe(tap(() => this.router.navigate(['/orders'])))
      .subscribe();
  }
}
