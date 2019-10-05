import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Deposito } from '../modelos/deposito';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepositoServiceService {

  private depositoUrl:string ;

  constructor(private http:HttpClient) {
    this.depositoUrl = "http://localhost:8090/api/depositos";
   }

  public findAll(): Observable<Deposito[]>{
    return this.http.get<Deposito[]>(this.depositoUrl);
  }

  public save(deposito:Deposito){
    return this.http.post<Deposito>(this.depositoUrl, deposito);
  }

  public excluir(codigo:number): Observable<void>{
    return this.http.delete<void>(this.depositoUrl + "/"+codigo)
  }

  public alterar(deposito:Deposito): Observable<void>{
    return this.http.put<void>(this.depositoUrl, deposito)
  }
}
