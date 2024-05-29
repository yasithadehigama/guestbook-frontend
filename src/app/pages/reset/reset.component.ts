import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password-validatior';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export default class ResetComponent {
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  token!: string;
  activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );

    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
    });
  }
  forgetPassword() {
    const resetPasswordObj = {
      token: this.token,
      password: this.resetForm.value.password,
    };

    this.userService.forgetPassword(resetPasswordObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();

        this.router.navigate(['login']);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
