import { Component, OnInit, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //Validações
  primeiraEntrada:boolean = false;
  sessaoExpirada:boolean = false
  admin:boolean

  constructor() { }

  ngOnInit() {


    //Verificar se é a primeira entrada
    let conta:boolean = JSON.parse(sessionStorage.getItem("novaConta"));
    if(conta == true){
      let imagem = document.getElementById("quems");
      imagem.style.marginTop = "1.5%";
      this.primeiraEntrada = true;
      sessionStorage.removeItem("novaConta");
    }

    //Verificar se a sessão está expirada
    let sessao:boolean = JSON.parse(sessionStorage.getItem("sessaoExpirada"));
    if(sessao == true){
      let imagem = document.getElementById("quems");
      imagem.style.marginTop = "1.5%";
      this.sessaoExpirada = true;
      sessionStorage.removeItem("sessaoExpirada");
    }

    let administrador:boolean = JSON.parse(sessionStorage.getItem("admin"));
    if(administrador == true){
      this.admin = true
    }else {
      this.admin = false;
    }

  }

  atualizarAdmin(){
    let administrador:boolean = JSON.parse(sessionStorage.getItem("admin"));
    if(administrador == true){
      this.admin = true
    }else {
      this.admin = false;
    }
  }
  
  //Fechar mensagem de primeira entradas
  fecharModalNovaConta(){
    this.primeiraEntrada = false;
    let imagem = document.getElementById("quems");
    imagem.style.marginTop = "16%";
  }

  //Fechar mensagem de sessão expirada
  fecharModalSessao(){
    this.sessaoExpirada = false;
    let imagem = document.getElementById("quems");
    imagem.style.marginTop = "16%"
  }

}
