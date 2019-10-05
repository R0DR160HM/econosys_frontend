import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investimento } from '../modelos/investimento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestimentoServiceService {

  private investimentoUrl:string

  constructor(private http:HttpClient) {
    this.investimentoUrl = "http://localhost:8090/api/investimentos";
   }

   public salvar(investimento:Investimento){
     return this.http.post<Investimento>(this.investimentoUrl, investimento)
   }

   public buscar(idUsuario:number): Observable<Investimento[]>{
     return this.http.get<Investimento[]>(this.investimentoUrl+"/"+idUsuario)
   }

   public delete(idInvestimento:number){
    return this.http.delete<void>(this.investimentoUrl+"/"+idInvestimento);

  }

}
