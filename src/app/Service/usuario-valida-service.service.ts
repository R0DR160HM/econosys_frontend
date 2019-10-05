import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioValidaServiceService {

  private usuarioUrl:string

  constructor(private http:HttpClient) {
    this.usuarioUrl = "http://localhost:8090/api/usuariosEmail"

   }

   public findByEmailUsuario(email_usuario:string): Observable<Usuario> {

    return this.http.get<Usuario>(this.usuarioUrl+"/"+email_usuario);

   }
}
