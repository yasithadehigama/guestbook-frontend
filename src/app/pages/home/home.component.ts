import { Component, OnInit, inject } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comments';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent implements OnInit {
  fb = inject(FormBuilder);
  commentForm!: FormGroup;
  userService = inject(UserService);
  commentService = inject(CommentService);
  public allComments: Comment[] = [];
  isAdminLoggedIn = true;

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((res) => {
      this.isAdminLoggedIn = this.userService.isAdminLoggedIn();
    });

    console.log('Is Admin logged in : ', this.isAdminLoggedIn);

    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });

    this.commentService.getAllComments().subscribe({
      next: (res) => {
        this.allComments = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    console.log(this.commentForm.value);

    this.commentService.addComment(this.commentForm.value).subscribe({
      next: (res) => {
        this.ngOnInit();
        alert('Comment added');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteComment(id: string) {
    console.log(id);
    this.commentService.deleteComment(id).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hideComment(id: string) {
    console.log(id);
    this.commentService.hideComment(id).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
