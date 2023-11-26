import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Habitacion } from '../hotel/models/habitacion';
import * as singnalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  baseUrl: string;
  url = environment.apiUrl;
  private hubConnection: singnalR.HubConnection;
  signalRecived = new EventEmitter<Habitacion>();
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
    this.buildConnection();  this.startConnection();
  }
  private buildConnection = () => {
    this.hubConnection = new singnalR.HubConnectionBuilder()
    .withUrl(this.url + "signalHub")
    .build();
  }
  private startConnection = () => {
    this.hubConnection
    .start()
    .then(() => {
      console.log("Iniciando signal");
      this.registerSignalEvents();
    })
    .catch(err => {
      console.log("Error en el signal" + err);
      setTimeout(function() {
        this.startConnection();
      }, 3000);
    });
  }
  private registerSignalEvents(){
    this.hubConnection.on("habitacionRegistrada", (data: Habitacion) => {
      this.signalRecived.emit(data);
    });
  }
  get(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.url + 'api/Habitacion')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Habitacion[]>('Consulta Habitacion', null))
      );
  }
  
  getId(IdHabitacion: string): Observable<Habitacion> {
    const url = `${this.url + 'api/reserva'}/${IdHabitacion}`;
      return this.http.get<Habitacion>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Habitacion>('Buscar Reserva', null))
      );
  }
  delete(numerohabitacion: string): Observable<Habitacion> {
    return this.http.delete<Habitacion>(this.url + 'api/Habitacion/' + numerohabitacion).pipe(
      tap(_ => this.handleErrorService.log('Datos')),
      catchError(this.handleErrorService.handleError<Habitacion>('Eliminar Habitacion', null))
    );
  }
  put(habitacion: Habitacion){
    return this.http.put<Habitacion>(this.url + 'api/Habitacion', habitacion)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Habitacion>('Registrar Habitacion', null))
      );
  }
  post(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.url + 'api/Habitacion', habitacion)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Habitacion>('Registrar Habitacion', null))
      );
  }
}
