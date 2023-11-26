import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Habitacion } from '../../models/habitacion';
import { Reserva } from '../../models/reserva';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-habitacion-consulta',
  templateUrl: './habitacion-consulta.component.html',
  styleUrls: ['./habitacion-consulta.component.css']
})
export class HabitacionConsultaComponent implements OnInit {
  habitaciones: Habitacion[];
  searchText: string;
  closeResult = '';
  constructor(private modalService: NgbModal, private habitacionService: HabitacionService, private reservaService: ReservaService) { }

  ngOnInit(){
    this.habitaciones = [];
    this.habitacionService.get().subscribe(result => {
      this.habitaciones = result;
    });
      this.actualizarListaSignal();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editar(habitacion: Habitacion){
    this.habitacionService.put(habitacion).subscribe(p=>{    
  })
  }
  eliminar(habitacion: Habitacion){
    this.habitacionService.delete(habitacion.idHabitacion).subscribe(p=>{
      
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: se ha eliminado una habitacion';
      
    })
  }

  private actualizarListaSignal(){
    this.habitacionService.signalRecived.subscribe((habitacion: Habitacion) => {
      this.habitaciones.push(habitacion);
    });
    console.log('a');
    this.reservaService.signalRecived.subscribe((reserva: Reserva) => {
      this.habitacionService.get().subscribe(result => {
        this.habitaciones = result;
      });
    });
  }


    /*Ordenar en la tabla*/

    sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        }
        else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
}
