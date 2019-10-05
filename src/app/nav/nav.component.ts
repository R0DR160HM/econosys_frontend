import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavParcialComponent implements OnInit {

  //Validações
  logado:boolean
  admin:boolean

  constructor(private router:Router) { }

  ngOnInit() {

    //Sessão
    let sessao = JSON.parse(sessionStorage.getItem("usuario"));
    let administrador = JSON.parse(sessionStorage.getItem("admin"));

    if(administrador != null){
      this.admin = true;
    }else if(sessao != null){
      this.logado = true;
    }else{
      this.logado = false;
      this.admin = false;
    }

    


  }

  public navbar(){

    //Sessão
    let sessao = JSON.parse(sessionStorage.getItem("usuario"));
    let administrador = JSON.parse(sessionStorage.getItem("admin"));

    if(administrador != null){
      this.admin = true;
    }else if(sessao != null){
      this.logado = true;
    }else{
      this.logado = false;
      this.admin = false;
    }
  }
  
  sair(){

    //Limpar sessão
    sessionStorage.clear();

    //Verificar o tipo da navbar
    this.navbar();

    //Ir para a página inicial
    this.router.navigate(["/redirect"]);

  }

}
