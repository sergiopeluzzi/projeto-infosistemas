/** 
 * File: create.component.ts
 * Description: Componente da nossa edição de veículos
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title = "Novo Veículo"
  ngForm: FormGroup

  //Instancia as classes a serem usadas
  constructor(private router: Router, private vehicleservice: VehicleService, private fb: FormBuilder) { 
    //Chamada do método
    this.createForm()
  }

  //Cria um form com validação
  createForm() {
    this.ngForm = this.fb.group({
      id: ['', Validators.required],
      placa: ['', Validators.required], 
      renavam: ['', Validators.required],
      chassi: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', Validators.required]
    })
  }

  //Chama o método que insere os dados na API passando os dados do form
  addVehicle(id, placa, renavam, chassi, modelo, marca, ano) {
    this.vehicleservice.addVehicle(id, placa, renavam, chassi, modelo, marca, ano)
    //Redireciona para o path '/'
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
  }

}
