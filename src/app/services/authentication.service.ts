import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HandleHttpErrorService } from './../@base/handle-http-error.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../hotel/models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  Url: string;
  usuario: User;
  url = environment.apiUrl;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string,
    private handleErrorService: HandleHttpErrorService, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('Login')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.Url = this.url;
  }

  login(password: string, username: string) {
    return this.http.post<any>(`${this.url}api/Login`,{password, username})
    .pipe(
      catchError(this.handleErrorService.handleError<User>('Inicio Sesion', null)),
      map(user => {
      sessionStorage.setItem('Login',JSON.stringify(user));
      return user;
      
    }));
  }
  

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

}
