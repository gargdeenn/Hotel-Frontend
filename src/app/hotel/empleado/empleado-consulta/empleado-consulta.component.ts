import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from '../../models/empleado';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empleado-consulta',
  templateUrl: './empleado-consulta.component.html',
  styleUrls: ['./empleado-consulta.component.css']
})
export class EmpleadoConsultaComponent implements OnInit {
  empleados: Empleado[];
  closeResult = '';
  searchText: string;
  page = 1;
  pageSize =5;
  constructor(private modalService: NgbModal,private empleadoService: EmpleadoService) { }

  ngOnInit(){
    this.empleadoService.get().subscribe(result => {
      this.empleados = result;
      });
  }
  editar(empleado: Empleado){
    this.empleadoService.put(empleado).subscribe(p=>{    
  })
  }
  eliminar(empleado: Empleado){
    this.empleadoService.delete(empleado.cedula).subscribe(p=>{
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: se ha eliminado una habitacion';
    })
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
}
