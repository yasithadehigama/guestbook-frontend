import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.userService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert('User Logged');
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('userType', res.data.userType);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('id', res.data.id);
        if (res.data.userType == 'ADMIN') {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['']);
        }
        this.userService.isLoggedIn$.next(true);

        this.loginForm.reset();
      },
      error: (err) => {
        if (err.status == 403) {
          alert('Please contact Admin Team');
          this.loginForm.reset();
        }
        console.log(err);
      },
    });
  }
}
