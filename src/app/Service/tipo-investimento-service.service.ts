import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoInvestimento } from '../modelos/tipo-investimento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoInvestimentoServiceService {

  private tipoInvestimentoUrl:string

  constructor(private http:HttpClient) { 
    this.tipoInvestimentoUrl = "http://localhost:8090/api/tipoInvestimento"

  }

  public salvar(tipoInvestimento:TipoInvestimento){
    return this.http.post<TipoInvestimento>(this.tipoInvestimentoUrl, tipoInvestimento)
  }

  public buscar(idUsuario:number): Observable<TipoInvestimento[]>{
    return this.http.get<TipoInvestimento[]>(this.tipoInvestimentoUrl+"/"+idUsuario)
  }

}
