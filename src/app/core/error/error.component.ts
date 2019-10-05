import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  sair(){

    //Limpar sessão
    sessionStorage.clear();

    //Ir para a página inicial
    window.location.href = "/";

  }

}
