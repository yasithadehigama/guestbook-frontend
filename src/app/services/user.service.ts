import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(
      `${apiUrl.serviceUrl}/user/register`,
      registerObj
    );
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrl.serviceUrl}/user/login`, loginObj);
  }

  getAllUsers() {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<any>(`${apiUrl.serviceUrl}/user/get-users`, {
      headers: httpHeaders,
    });
  }

  deleteUser(id: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.delete<any>(`${apiUrl.serviceUrl}/user?id=${id}`, {
      headers: httpHeaders,
    });
  }

  banUser(id: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.put<any>(
      `${apiUrl.serviceUrl}/user?id=${id}`,
      {},
      {
        headers: httpHeaders,
      }
    );
  }

  deleteAccount(id: string | null) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.delete<any>(
      `${apiUrl.serviceUrl}/user/delete-account?id=${id}`,
      {
        headers: httpHeaders,
      }
    );
  }

  updateUserName(data: any) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.put<any>(
      `${apiUrl.serviceUrl}/user/update-username`,
      data,
      {
        headers: httpHeaders,
      }
    );
  }

  sendEmail(sendEmailObj: any) {
    return this.http.post<any>(
      `${apiUrl.serviceUrl}/auth/send-email`,
      sendEmailObj
    );
  }

  forgetPassword(forgetPasswordObj: any) {
    return this.http.post<any>(
      `${apiUrl.serviceUrl}/auth/forget-password`,
      forgetPasswordObj
    );
  }

  resetPassword(resetPasswordObject: any) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.post<any>(
      `${apiUrl.serviceUrl}/user/reset-password`,
      resetPasswordObject,
      {
        headers: httpHeaders,
      }
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('email');
  }

  isAdminLoggedIn() {
    if (localStorage.getItem('userType') == 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }
}
