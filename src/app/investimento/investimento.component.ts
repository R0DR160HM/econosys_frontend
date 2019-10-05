import { Component, OnInit } from '@angular/core';
import { Investimento } from '../modelos/investimento';
import { InvestimentoServiceService } from '../Service/investimento-service.service';
import { Usuario } from '../modelos/usuario';
import { TipoInvestimento } from '../modelos/tipo-investimento';
import { TipoInvestimentoServiceService } from '../Service/tipo-investimento-service.service';
import { Router } from '@angular/router';
import { DepositoServiceService } from '../Service/deposito-service.service';
import { Deposito } from '../modelos/deposito';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrls: ['./investimento.component.css']
})
export class InvestimentoComponent implements OnInit {

  //Sessão
  session:Usuario = JSON.parse(sessionStorage.getItem("usuario"));

  //Variáveis
  tipoInvestimento:string
  tipo:number
  dataRetorno:string;
  dia:string
  mes:string
  ano:string
  origem:string
  taxa:number
  valorInicial:number
  valorFinal:number
  investimentos:Investimento[]

  //Validações
  erroValor:boolean = false;
  erroOrigem:boolean = false;
  erroTaxa:boolean = false;
  erroTipo:boolean = false;
  erroData:boolean = false;
  erroFinal:boolean = false;
  erroObter:boolean = false;

  //Objetos
  inv = new Investimento();
  tipoInv = new TipoInvestimento();


  constructor(private investimentoService:InvestimentoServiceService, private tipoInvestimentoServico:TipoInvestimentoServiceService, private depositoService:DepositoServiceService, private route:Router) { }

  ngOnInit(datas:Date = new Date()) {

    //Verifca se esta logado
    let sessao = JSON.parse(sessionStorage.getItem("usuario"));

    if(sessao == null){
      
      let sessaoExpirada:boolean = true;
      sessionStorage.setItem("sessaoExpirada", JSON.stringify(sessaoExpirada));
      this.route.navigate(["/"]);

    }
 
    //-------------------------------------------------------------------------------------

    //Carregar investimentos
    this.investimentoService.buscar(this.session.idUsuario).subscribe((invest:Investimento[])=>{
      this.investimentos = invest
    })

    
    //Definir limite do campo de Origem
    let inputOrigem = document.getElementsByTagName("input")[2];
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

  }

  //Fechar mensagem de valor excessivo
  fecharModal(){
    this.erroFinal = false;
  }

  //Fechar mensagem de data não-alcançada
  fecharModalData(){
    this.erroObter = false;
  }

  //Definir o tipo do investimento como mensal
  mensal(){
    this.tipoInvestimento = "Investimento de rendimento mensal"
    this.tipo = 0
  }
  
  //Definir o tipo do investimento como anual
  anual(){
    this.tipoInvestimento = "Investimento de rendimento anual"
    this.tipo = 1
  }

  //Definir o tipo do investimento como final
  final(){
    this.tipoInvestimento = "Investimento de rendimento único"
    this.tipo = 2
  }

  //Atualizar lista de investimentos
  atualizar(){
    this.investimentoService.buscar(this.session.idUsuario).subscribe((invest:Investimento[])=>{
      this.investimentos = invest
    })
  }

  //Verificar a possibilidade de investimentos
  verificar(){

    //Verificar valor
    if(this.valorInicial == null || this.valorInicial == 0){
      this.erroValor = true;
    }else{

      this.erroValor = false;

      for(let i:number = 0; i<this.valorInicial.toString().length; i++){
        if(this.valorInicial.toString().charCodeAt(i) < 48 || this.valorInicial.toString().charCodeAt(i) > 57){
          if(this.valorInicial.toString().charCodeAt(i) != 46){
            this.erroValor = true;
          }
        }
      }
    
    }

    //Verificar a origem
    if(this.origem == null || this.origem.length == 0){
      this.erroOrigem = true
    }else{
      this.erroOrigem = false
    }

    //Verificar a taxa
    if(this.taxa == null || this.taxa == 0){
      this.erroTaxa = true;
    }else{

      this.erroTaxa = false;

      for(let i:number = 0; i<this.taxa.toString().length; i++){
        if(this.taxa.toString().charCodeAt(i) < 48 || this.taxa.toString().charCodeAt(i) > 57){
          if(this.taxa.toString().charCodeAt(i) != 46){
            this.erroTaxa = true;
          }
        }
      }
    }

    //Verificar tipo
    if(this.tipo != 0 && this.tipo != 1 && this.tipo != 2){
      this.erroTipo = true
    }else{
      this.erroTipo = false;
    }

    //Verificar data
    if(this.dataRetorno == null || this.dataRetorno.length != 10){
      this.erroData = true
    }else{
      let datas:string[] = this.dataRetorno.split("-");
      if(parseInt(datas[0]) > parseInt(this.ano)){
        this.erroData = false;
      }else if(parseInt(datas[0]) == parseInt(this.ano) && parseInt(datas[1]) > parseInt(this.mes)){
        this.erroData = false;
      }else if(parseInt(datas[0]) == parseInt(this.ano) && parseInt(datas[1]) == parseInt(this.mes) && parseInt(datas[2]) >= parseInt(this.dia)){
        this.erroData = false;
      }else{
        this.erroData = true;
      }
    }


  }

  //Obter o montante do investimento
  receberInvestimento(idInvestimento:number, deposito:Deposito){

    this.investimentoService.delete(idInvestimento).subscribe((data)=>{
        this.depositoService.save(deposito).subscribe((data)=>{
          this.atualizar();
        })
    })



  }

  //Ação do botão de obter montante
  obter(id:number, dataFinal:string, nomeInvestimento:string, valor:number){
    let dataAtual:Date = new Date();
    let dataDeposito:string[] = dataFinal.split("/");
   
    let mesObter:number = dataAtual.getMonth()+1;
    if(mesObter == 13){
      mesObter = 1;
    }

    //Objeto da classe Deposito
    let deposito:Deposito = new Deposito()

      //Definir atributos do objeto Deposito
      deposito.data = this.dia+"/"+this.mes+"/"+this.ano;
      deposito.origem = nomeInvestimento;
      deposito.usuario = this.session.idUsuario
      deposito.valor = valor;


    if(dataAtual.getFullYear() > parseInt(dataDeposito[2])){
      
      this.receberInvestimento(id, deposito);
      this.erroObter = false;

    }else if(dataAtual.getFullYear() == parseInt(dataDeposito[2]) && mesObter > parseInt(dataDeposito[1])){
      
      this.receberInvestimento(id, deposito);
      this.erroObter = false;

    }else if(dataAtual.getFullYear() == parseInt(dataDeposito[2]) && mesObter == parseInt(dataDeposito[1]) && dataAtual.getDate() >= parseInt(dataDeposito[0])){
      
      this.receberInvestimento(id, deposito);
      this.erroObter = false;

    }else{

      this.erroObter = true;

    }



  }

  excluir(id:number){
    this.investimentoService.delete(id).subscribe((data)=>{
      this.atualizar();
    })
  }

  //Realizar investimento
  investir(){


    this.verificar();


    if(this.erroData == false && this.erroOrigem == false && this.erroTaxa == false && this.erroTipo == false && this.erroValor == false){

      let data2:string[] = this.dataRetorno.split("-");

    if(this.tipo == 2){

      this.valorFinal = Number(this.valorInicial)+((Number(this.valorInicial)*this.taxa)/100)

    }else if(this.tipo == 1){

      let diferenca:number = (parseInt(data2[0])-parseInt(this.ano))
      
      this.valorFinal = Number(this.valorInicial)
      for(let i=0; i<diferenca; i++){
        this.valorFinal = this.valorFinal+((this.valorFinal*this.taxa)/100)
      }

    }else if(this.tipo == 0){

      let meses1:number = (parseInt(this.ano)*12)+parseInt(this.mes)
      let meses2:number = (parseInt(data2[0])*12)+parseInt(data2[1])

      let diferenca:number = meses2-meses1

      this.valorFinal = Number(this.valorInicial)

      for(let i=0; i<diferenca; i++){
        this.valorFinal = this.valorFinal+((this.valorFinal*this.taxa)/100)
      }
    }

    //Definir atributos do ojeto de Investimento
    this.inv.dataRetornoInvestimento = data2[2]+"/"+data2[1]+"/"+data2[0];
    this.inv.dataInvestimento = this.dia+"/"+this.mes+"/"+this.ano
    this.inv.nomeInvestimento = this.origem;
    this.inv.taxaInvestimento = this.taxa;
    this.inv.tipoInvestimento = this.tipo;
    this.inv.idUsuario = this.session.idUsuario;
    this.inv.valorInicial = this.valorInicial;
    this.inv.valorFinal = this.valorFinal;

    //Cadastra o tipo Investimento
    this.tipoInv.idUsuario = this.session.idUsuario
    this.tipoInv.nomeInvestimento = this.origem
    this.tipoInv.tipoInvestimento = this.tipo;

 

    //Investir
    if(this.valorFinal != Infinity && this.valorFinal < 3.40282347e+38){


      this.tipoInvestimentoServico.salvar(this.tipoInv).subscribe((data)=>{})

      this.investimentoService.salvar(this.inv).subscribe((data)=>{
        this.atualizar();
      })
  
      //Limpar campos
      this.dataRetorno = null;
      this.origem = null;
      this.tipo = null;
      this.valorInicial = null;
      this.taxa = null
      this.tipoInvestimento = "Tipo do Investimento"

      this.erroFinal = false;


    }else{
      this.erroFinal = true;

    }
    
  }

    }

}