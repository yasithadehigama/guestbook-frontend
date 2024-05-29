import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export default class ForgetPasswordComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);

  forgetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  sendEmail() {
    console.log(this.forgetPasswordForm.value);

    this.userService.sendEmail(this.forgetPasswordForm.value).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
