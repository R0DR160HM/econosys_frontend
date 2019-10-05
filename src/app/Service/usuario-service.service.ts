import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private usuarioUrl:string

  constructor(private http:HttpClient) { 
    this.usuarioUrl = "http://localhost:8090/api/usuarios"

  }

  public save(usuario:Usuario) {
    return this.http.post<Usuario>(this.usuarioUrl, usuario);
  }

  public delete(id_usuario:number) {
    return this.http.delete<Usuario>(this.usuarioUrl+"/"+id_usuario);
  }

  public atualiza(usuario:Usuario) {
    return this.http.put<Usuario>(this.usuarioUrl, usuario);
  }

  public findAll(){
    return this.http.get<Usuario[]>(this.usuarioUrl);
  }

}
