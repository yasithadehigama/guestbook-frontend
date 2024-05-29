import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users';

@Component({
  selector: 'app-usermanage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './usermanage.component.html',
  styleUrl: './usermanage.component.css',
})
export default class UsermanageComponent {
  userService = inject(UserService);
  public allUsers: User[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: string) {
    console.log(id);
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  banUser(id: string) {
    console.log(id);
    this.userService.banUser(id).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
