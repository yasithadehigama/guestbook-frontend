import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../validators/confirm-password-validatior';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);

  isLoggedIn = true;
  isAdminLoggedIn = true;
  updateUserNameForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.updateUserNameForm = this.fb.group({
      userName: ['', Validators.required],
    });

    this.resetPasswordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  updateUserName() {
    this.userService.updateUserName(this.updateUserNameForm.value).subscribe({
      next: (res) => {
        alert('User Name Updated');
        this.router.navigate(['']);
      },
      error: (err) => {
        if (err.status == 403) {
          alert('Please contact Admin Team');
          this.updateUserNameForm.reset();
        }
        console.log(err);
      },
    });
  }

  deleteAccount() {
    const id: string | null = localStorage.getItem('id');
    this.userService.deleteAccount(id).subscribe({
      next: (res) => {
        this.router.navigate(['']);
        localStorage.removeItem('email');
        localStorage.removeItem('userType');
        localStorage.removeItem('access_token');
        localStorage.removeItem('id');
        this.userService.isLoggedIn$.next(false);
        this.userService.isLoggedIn$.subscribe((res) => {
          this.isLoggedIn = this.userService.isLoggedIn();
          this.isAdminLoggedIn = this.userService.isAdminLoggedIn();
        });
      },
      error: (err) => {
        if (err.status == 403) {
          alert('Please contact Admin Team');
        }
        console.log(err);
      },
    });
  }

  resetPassword() {
    console.log(this.resetPasswordForm.value);

    this.userService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetPasswordForm.reset();

        this.router.navigate(['']);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
