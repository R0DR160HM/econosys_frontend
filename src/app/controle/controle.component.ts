import { Component, OnInit } from '@angular/core';
import { Deposito } from '../modelos/deposito';
import { DepositoServiceService } from '../Service/deposito-service.service';
import { Usuario } from '../modelos/usuario';
import { DepositoUsuarioServiceService } from '../Service/deposito-usuario-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

  //Variaveis
  valorDeposito:number
  origemDeposito:string;
  dia:string
  mes:string
  ano:string
  depositos:Deposito[];
  alteracao:boolean = false;
  idAlteracao:number

  //Objeto da classe Deposito
  dep = new Deposito();

  //Sessão
  usuario:Usuario = JSON.parse(sessionStorage.getItem("usuario"));

  //Validações
  erroOrigem:boolean = false;
  erroValor:boolean = false;



  
  constructor(private depositoServico:DepositoServiceService, private depositoUServico:DepositoUsuarioServiceService, private route:Router) { }

  ngOnInit(datas:Date = new Date()) {

    //Verifca se esta logado
    let sessao = JSON.parse(sessionStorage.getItem("usuario"));

    if(sessao == null){
      
      //Redirecionar
      let sessaoExpirada:boolean = true;
      sessionStorage.setItem("sessaoExpirada", JSON.stringify(sessaoExpirada));
      this.route.navigate(["/"]);

    }
 
    //-------------------------------------------------------------------------------------

    //Definir limite ao input de origem
    let inputOrigem = document.getElementsByTagName("input")[1];
    inputOrigem.maxLength = 15;


    //Obter data
    let mesParcial:number = datas.getMonth()+1;
    if(mesParcial == 13){
      mesParcial = 1;
    }

    this.dia = ""+(datas.getDate());
    this.mes = ""+mesParcial;
    this.ano = ""+datas.getFullYear();

    if(datas.getDate()+1 < 10){
      this.dia = "0"+(datas.getDate());
    }

    if(parseInt(this.mes) < 10){
      this.mes = "0"+this.mes;
    }


    //Carregar depósitos
    this.depositoUServico.findByUsuario(this.usuario.idUsuario).subscribe((deposi:Deposito[])=>{
      this.depositos = deposi;
    })

  }


  //Atualizar depósitos
  atualizar(){
    this.depositoUServico.findByUsuario(this.usuario.idUsuario).subscribe((deposi:Deposito[])=>{
      this.depositos = deposi;
    })
  }

  //Verificar se é possível cadastrar depósito
  verificar(){

    if((this.valorDeposito == null) || (this.valorDeposito == 0)){
      this.erroValor = true
    }else {

      this.erroValor = false;

      for(let i:number = 0; i<this.valorDeposito.toString().length; i++){
        if(this.valorDeposito.toString().charCodeAt(i) < 48 || this.valorDeposito.toString().charCodeAt(i) > 57){
          if(this.valorDeposito.toString().charCodeAt(i) != 46){
            this.erroValor = true;
          }
        }
      }

    }

    if((this.origemDeposito == null) || (this.origemDeposito.length == 0)){
      this.erroOrigem = true;
    }else{
      this.erroOrigem = false;
    }

  }

  //Cadastrar depósito positivo
  creditar(){

    this.verificar();

    if((this.erroOrigem == false) && (this.erroValor == false)) {

      //Definir atributos da objeto Deposito
      this.dep.origem = this.origemDeposito;
      this.dep.data = this.dia+"/"+this.mes+"/"+this.ano;
      this.dep.usuario = this.usuario.idUsuario;
      this.dep.valor = this.valorDeposito;

      //Cadastrar depósito
      this.depositoServico.save(this.dep).subscribe((data)=>{
        this.atualizar();
      })

      //Limpar campos
      this.origemDeposito = null;
      this.valorDeposito = null;

  }

  }

  //Cadastrar depósito negativo
  debitar(){

    this.verificar();

    if((this.erroOrigem == false) && (this.erroValor == false)) {
  
      //Definir atributos do objeto Deposito
      this.dep.origem = this.origemDeposito;
      this.dep.data = this.dia+"/"+this.mes+"/"+this.ano;
      this.dep.usuario = this.usuario.idUsuario;
      this.dep.valor = this.valorDeposito*-1;

      //Cadastrar depósito
      this.depositoServico.save(this.dep).subscribe((data)=>{
        this.atualizar();
      })

      //Limpar campos
      this.origemDeposito = null;
      this.valorDeposito = null;

  }

  }

  //Ação do botão de alterar
  alterar(codigo:number, valor:number, origem:string){
    this.alteracao = true
    this.origemDeposito = origem;
    this.valorDeposito = Math.sqrt((valor*valor));
    this.idAlteracao = codigo;
  }

  //Cancelar ação do botão de alterar
  cancelar(){
    this.alteracao = false;
    this.valorDeposito = null;
    this.idAlteracao = null;
    this.origemDeposito = null;
  }

  //Alterar
  alterarCredito(){

    this.verificar()

    if((this.erroOrigem == false) && (this.erroValor == false)) {

      //Objeto da classe Deposito
     let depAlt:Deposito = new Deposito();

      //Definir atributos do objeto Deposito
      depAlt.codigo = this.idAlteracao
      depAlt.data = this.dia+"/"+this.mes+"/"+this.ano;
      depAlt.origem = this.origemDeposito
      depAlt.usuario = this.usuario.idUsuario
      depAlt.valor = this.valorDeposito;

      //Alterar
      this.depositoServico.alterar(depAlt).subscribe((data)=>{
        this.cancelar();
        this.atualizar();
        
      })
    }
      this.cancelar();

  }

  alterarDebito(){

    this.verificar()

    if((this.erroOrigem == false) && (this.erroValor == false)) {

      //Objeto da classe Deposito
      let depAlt:Deposito = new Deposito();

    //Definir atributos do objeto Deposito
    depAlt.codigo = this.idAlteracao
    depAlt.data = this.dia+"/"+this.mes+"/"+this.ano;
    depAlt.origem = this.origemDeposito
    depAlt.usuario = this.usuario.idUsuario
    depAlt.valor = this.valorDeposito*-1;

    //Alterar
    this.depositoServico.alterar(depAlt).subscribe((data)=>{
      this.cancelar();
      this.atualizar();
      
    })
  }
  this.cancelar();

  }

  //Excluir depósito
  excluir(codigo:number){
    this.depositoServico.excluir(codigo).subscribe((data)=>{
      this.atualizar()
    })

  

}}
