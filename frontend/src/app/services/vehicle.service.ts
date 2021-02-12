/** 
 * File: vehicle.service.ts
 * Description: Service que faz as requisiçoes http na nossa API
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  /**
   * Método para adicionar um veículo
   */
  addVehicle(id, placa, renavam, chassi, modelo, marca, ano) {
    const uri = 'http://localhost:3000/vehicle/add'
    
    const obj = {
      id: id,
      placa: placa,
      renavam: renavam, 
      chassi: chassi,
      modelo: modelo,
      marca: marca,
      ano: ano
    }

    this.http.post(uri, obj).subscribe(res => console.log('Deu certo add!!!'))
   
  }

  /**
   * Método que busca o veículo a ser editado na API
   * @param id 
   */
  editVehicle(id) {
    const uri = `http://localhost:3000/vehicle/edit/${id}`
        
    return this.http.get(uri).pipe(map(res => {
      return res[0]
    }))
  }

  /**
   * Método que atualiza os dados do veículo na nossa API
   * @param id 
   * @param placa 
   * @param renavam 
   * @param chassi 
   * @param modelo 
   * @param marca 
   * @param ano 
   * @param idparam 
   */
  updateVehicle(id, placa, renavam, chassi, modelo, marca, ano, idparam) {
    const uri = `http://localhost:3000/vehicle/update/${idparam}`
    
    const obj = {
      id: id,
      placa: placa,
      renavam: renavam, 
      chassi: chassi,
      modelo: modelo,
      marca: marca,
      ano: ano
    }

    this.http.patch(uri, obj).subscribe(res => console.log('Deu certo update!!!'))
  }

  /**
   * Método que obtem todos os veículos da nossa API
   */
  getVehicles() {
    const uri = 'http://localhost:3000/vehicle/list'

    return this.http.get(uri)
  }

  /**
   * Método que exclui um veículo na nossa API
   * @param id 
   */
  deleteVehicle(id) {
    const uri = `http://localhost:3000/vehicle/delete/${id}`
    
    return this.http.delete(uri)
  }
}
