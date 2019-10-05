import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { UsuarioServiceService } from '../Service/usuario-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin:boolean
  usuarios:Usuario[];

  constructor(private usuarioServico:UsuarioServiceService, private route:Router) { }

  ngOnInit() {

    //Verifca se esta logado
    let sessao = JSON.parse(sessionStorage.getItem("admin"));

    if(sessao == null){
      
      let sessaoExpirada:boolean = true;
      sessionStorage.setItem("sessaoExpirada", JSON.stringify(sessaoExpirada));
      this.route.navigate(["/"]);

    }else{
      this.admin = true;
    }

    //Obtem a lista de usuarios
    this.usuarioServico.findAll().subscribe((users:Usuario[])=>{
      this.usuarios = users;
    })

  }

  atualizar(){
    this.usuarioServico.findAll().subscribe((users:Usuario[])=>{
      this.usuarios = users;
    })
  }


  excluir(idUsuario:number){
    this.usuarioServico.delete(idUsuario).subscribe((data)=>{
      this.atualizar();
    })
  }

}
