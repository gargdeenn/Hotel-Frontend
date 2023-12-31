import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Factura } from '../hotel/models/factura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  baseUrl: string;
  url = environment.apiUrl;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }
  get(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.url + 'api/Factura')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Factura[]>('Consulta Factura', null))
      );
  }
  post(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.url + 'api/Factura', factura)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Factura>('Registrar Factura', null))
      );
  }
}