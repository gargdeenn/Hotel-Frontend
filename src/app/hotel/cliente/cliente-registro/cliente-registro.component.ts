import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../models/cliente';
import { User } from '../../models/user';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {
  formregistro: FormGroup;
  cliente: Cliente;
  user: User;
  menorIgual: 105;
  mayorIgual: 18;
  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.user = new User();
    this.cliente = new Cliente();
    this.cliente.sexo = "Seleccionar sexo";
    this.user.tipo = "Cliente";
  }

  add() {
    this.cliente.agregarUsuario(this.user.username, this.user.password, this.user.tipo);
    this.clienteService.post(this.cliente).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Se ha agregado un cliente';
        this.cliente = p;
      }
    });
  }
}
