import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/forget-password/forget-password.component'),
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component'),
  },
  {
    path: 'manage-user',
    loadComponent: () => import('./pages/usermanage/usermanage.component'),
  },
  {
    path: 'reset/:token',
    loadComponent: () => import('./pages/reset/reset.component'),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component'),
  },
];

