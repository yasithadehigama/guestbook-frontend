import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getAllComments() {
    return this.http.get<any>(`${apiUrl.serviceUrl}/comment`);
  }

  addComment(comment: any) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.post<any>(`${apiUrl.serviceUrl}/comment`, comment, {
      headers: httpHeaders,
    });
  }

  deleteComment(id: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.delete<any>(`${apiUrl.serviceUrl}/comment?id=${id}`, {
      headers: httpHeaders,
    });
  }

  hideComment(id: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.put<any>(
      `${apiUrl.serviceUrl}/comment?id=${id}`,
      {},
      {
        headers: httpHeaders,
      }
    );
  }
}
