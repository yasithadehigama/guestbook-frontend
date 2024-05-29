import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userService = inject(UserService);
  isLoggedIn = false;
  isAdminLoggedIn = true;
  //router = inject(Router);

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.userService.isLoggedIn();
      this.isAdminLoggedIn = this.userService.isAdminLoggedIn();
    });
  }
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    this.userService.isLoggedIn$.next(false);
    //this.router.navigate(['login']);
  }
}
