import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authEndpoint = 'http://159.65.96.86:8080/services/auth/signin';

  // Agrega una propiedad para almacenar el token JWT
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };

    // Realiza la solicitud de inicio de sesión y almacena el token si es exitoso
    return this.http.post(this.authEndpoint, body)
      .pipe(
        tap((response: any) => {
          if (response && response.accessToken) {
            this.token = response.accessToken;
          }
        })
      );
  }

  isAuthenticated(): boolean {
    // Verifica si hay un token almacenado
    return !!this.token;
  }
}