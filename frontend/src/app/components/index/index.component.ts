/** 
 * File: index.component.ts
 * Description: Componente da nossa listagem de veículos
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  vehicles: any

  //Instancia o router e o nosso service
  constructor(private router: Router,  private vehicleservice: VehicleService) { }

  //Na inicialização do componente obtemos todos os veículos
  ngOnInit(): void {
    this.getVehicles()
  }

  //Chama o método do nosso service e devolve a resposta da requisição no atributo vehicles
  getVehicles() {
    this.vehicleservice.getVehicles().subscribe(res => {
      this.vehicles = res
    })
  }

  //Chama o método do service que exclui um veiculo e redireciona o path para '/'
  deleteVehicle(id) {
    this.vehicleservice.deleteVehicle(id).subscribe(res => {
      console.log('Excluído com sucesso');
    });
    this.router.navigate(['/'], {skipLocationChange: false})
  }
}
