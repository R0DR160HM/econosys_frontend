import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposito } from '../modelos/deposito';

@Injectable({
  providedIn: 'root'
})
export class DepositoUsuarioServiceService {

  private depositoUrl:string ;

  constructor(private http:HttpClient) {
    this.depositoUrl = "http://localhost:8090/api/depositosUsuario";
   }

  public findByUsuario(id_usuario:number): Observable<Deposito[]>{

    return this.http.get<Deposito[]>(this.depositoUrl+"/"+id_usuario);

   }

}
