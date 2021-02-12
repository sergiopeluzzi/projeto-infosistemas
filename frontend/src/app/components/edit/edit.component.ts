/** 
 * File: edit.component.ts
 * Description: Componente da nossa edição de veículos
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  title = "Editar Veículo"
  vehicle: any
  ngForm: FormGroup

  //Instancia as classes a serem usadas
  constructor(private route: ActivatedRoute, private router: Router, private vehicleservice: VehicleService, private fb: FormBuilder) { 
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

  //Chama o método que atualiza os dados na API passando os dados do form
  updateVehicle(id, placa, renavam, chassi, modelo, marca, ano, idparam) {
    this.vehicleservice.updateVehicle(id, placa, renavam, chassi, modelo, marca, ano, idparam)
    //Redireciona para o path '/'
    this.router.navigate(['/'])
  }

  //Na inicialização do component pega o id da URL e passa pro método do service que retornará os dados do veículo
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehicle = this.vehicleservice.editVehicle(params['id']).subscribe(res => {
        this.vehicle = res
      })
    })
  }

}
