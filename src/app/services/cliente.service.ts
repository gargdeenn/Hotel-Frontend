import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Cliente } from '../hotel/models/cliente';
import { Persona } from '../hotel/models/persona';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = environment.apiUrl;
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }
  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'api/Cliente')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Cliente[]>('Consulta Cliente', null))
      );
  }
  post(cliente: Cliente): Observable<Cliente> {
    
    return this.http.post<Cliente>(this.url + 'api/Cliente', cliente)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Cliente>('Registrar Cliente', null))
      );
  }
  getId(idCliente: string): Observable<Cliente> {
    const url = `${this.url + 'api/Cliente'}/${idCliente}`;
      return this.http.get<Cliente>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Cliente>('Buscar Cliente', null))
      );
  }
  // getIdUserName(userName: string): Observable<Persona> {
  //   const url = `${this.url + 'api/Persona'}/${userName}`;
  //     return this.http.get<Persona>(url, httpOptions)
  //     .pipe(
  //       tap(_ => this.handleErrorService.log('datos enviados')),
  //       catchError(this.handleErrorService.handleError<Cliente>('Buscar Cliente', null))
  //     );
  // }
  // getIdUserName(userName: String): Observable<Persona>{
  //   return this.http.get<Persona>("https://localhost:5001/"+"api/Persona/"+userName, httpOptions).pipe(
  //     tap(()=>console.log("Buscado correctamente"))
  //   )
  // }

}