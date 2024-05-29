import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comments';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export default class AdminComponent implements OnInit {
  commentService = inject(CommentService);
  public allComments: Comment[] = [];

  ngOnInit(): void {
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
