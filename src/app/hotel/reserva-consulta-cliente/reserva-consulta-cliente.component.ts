import { ReservaService } from 'src/app/services/reserva.service';
import { Component, OnInit } from '@angular/core';
import { Reserva } from '../models/reserva';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/cliente';

declare var jspdf: any; // Important

@Component({
  selector: 'app-reserva-consulta-cliente',
  templateUrl: './reserva-consulta-cliente.component.html',
  styleUrls: ['./reserva-consulta-cliente.component.css']
})
export class ReservaConsultaClienteComponent implements OnInit {
  reservas: Reserva[];
  reserva: Reserva;
  cliente: Cliente;
  public cedula: string;
  page = 1;
  pageSize =5;
  modalService: any;
  constructor(private reservaService: ReservaService, private clienteService: ClienteService) { }

  ngOnInit(){
    // this.reservas = [];
    // this.BuscarCedula();
  }
  // BuscarCedula(){
  //   var lista = JSON.parse(sessionStorage.getItem('Login'));
  //   this.clienteService.getIdUserName(lista.username).subscribe(result =>{
  //     this.cliente = result;
  //    });
     
  // }

  // Eliminar(reserva: Reserva){
  //   this.reservaService.delete(reserva.idReserva);
  //   if(reserva == null){
  //     const messageBox = this.modalService.open(AlertModalComponent)
  //     messageBox.componentInstance.title = "Resultado Operación";
  //     messageBox.componentInstance.cuerpo = 'Info: Se eliminó esta reserva';
  //   }
  // }
  
}
