import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DepositoUsuarioServiceService } from '../Service/deposito-usuario-service.service';
import { Deposito } from '../modelos/deposito';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Investimento } from '../modelos/investimento';
import { InvestimentoServiceService } from '../Service/investimento-service.service';
import { TipoInvestimentoServiceService } from '../Service/tipo-investimento-service.service';
import { TipoInvestimento } from '../modelos/tipo-investimento';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {

  //Session
  dadosUsuario:Usuario = JSON.parse(sessionStorage.getItem("usuario"));
  
  //Array de Depositos
  depositosUsuario:Deposito[]

  //Dados do gráfico de linha
  arrayDatas:string;
  arrayValores:string;

  arrayDatas2:string[];
  arrayValores2:string[];

  arrayValores3:number[] = [];

  //Array de Investimentos
  investimentosUsuario:TipoInvestimento[]
  
  //Validações
  grafico1:boolean;
  grafico2:boolean;
  grafico3:boolean;
  

  constructor(private usuarioDepositoServico: DepositoUsuarioServiceService, private usuarioInvestimentoServico: TipoInvestimentoServiceService, private route:Router) { }

  ngOnInit() {


    //Verifca se esta logado
    let sessao = JSON.parse(sessionStorage.getItem("usuario"));

    if(sessao == null){
      
      let sessaoExpirada:boolean = true;
      sessionStorage.setItem("sessaoExpirada", JSON.stringify(sessaoExpirada));
      this.route.navigate(["/"]);

    }
 
    //-------------------------------------------------------------------------------------



    this.usuarioDepositoServico.findByUsuario(this.dadosUsuario.idUsuario).subscribe((usuario:Deposito[])=>{
      this.depositosUsuario = usuario;

      //Pega as datas
      this.arrayDatas = "";

     

      for(let i:number=0; i<this.depositosUsuario.length; i++){

        if(i != this.depositosUsuario.length-1){
          this.arrayDatas = this.arrayDatas+this.depositosUsuario[i].data+";"
        }else{
          this.arrayDatas = this.arrayDatas+this.depositosUsuario[i].data
        }
       

      }

    

      //Pega os valores
      this.arrayValores = "";
      
      for(let i:number=0; i<this.depositosUsuario.length; i++){

        if(i != this.depositosUsuario.length-1){
           this.arrayValores = this.arrayValores+this.depositosUsuario[i].valor+";"

        }else {
            this.arrayValores = this.arrayValores+this.depositosUsuario[i].valor
        }
      }

      //Divide os valores
      this.arrayDatas2 = this.arrayDatas.split(";");
      this.arrayValores2 = this.arrayValores.split(";");

      
      //Transforma os dados do array de valore em numeros
      for(let i:number = 0; i<this.arrayValores2.length; i++) {
        
        this.arrayValores3.push(parseFloat(this.arrayValores2[i]));

      }
    
    //Grafico de Linha
    let graficoLinhaControle = document.getElementById("graficoLinhaControle");

	//@ts-ignore
	let chart = new Chart(graficoLinhaControle, {
	    type: "line",
	                        
	    data: {
	    		
	        labels: this.arrayDatas2,              
	        datasets: [
	            {
	                label: "Acompanhamento de Depósitos",
	                data: this.arrayValores3,
	                borderColor: "rgb(207, 21, 21)",
	    	    	
	            }
	        ]
	    },
	    options: {
	        elements: {
	            line: {
	                tension: 0 
	            }
	        }
	    }
	});

//----------------------------------------------------------------------------------------------------

  let creditos:number =0;
  let debitos:number =0;

  for(let i:number = 0; i<this.depositosUsuario.length; i++) {

      if(this.depositosUsuario[i].valor > 0) {
        creditos+=this.depositosUsuario[i].valor;
      }else{
        debitos+=this.depositosUsuario[i].valor;
      }

  }

  let valores:number[] = [creditos, debitos]


  //Grafico de Linha
  let graficoPizzaControle = document.getElementById("graficoPizzaControle");

	//@ts-ignore
	var myChart = new Chart(graficoPizzaControle, {
    type: 'pie',
    data: {
      labels: ["Entrada de Capital", "Saída de Capital"],
      datasets: [{
        backgroundColor: [
          "#1bd611",
          "#990303"         
        ],
        data: valores
      }]
    }
  });

})

//---------------------------------------------------------------------------------------------------------------------

this.usuarioInvestimentoServico.buscar(this.dadosUsuario.idUsuario).subscribe((usuario:TipoInvestimento[])=>{
    this.investimentosUsuario = usuario;

    //Pega os nomes de investimentos e deixa todos em letras maiusculas
    let arrayNaoFiltrado:string[] = [];

    for(let i:number = 0; i< this.investimentosUsuario.length; i++){

      arrayNaoFiltrado.push(this.investimentosUsuario[i].nomeInvestimento.toUpperCase());


    }

    //Faz a contagem de cada nome
    let arrayFiltrado:string[] = arrayNaoFiltrado.filter(function(primeiroItem, i) {
      return arrayNaoFiltrado.indexOf(primeiroItem) === i;
});

    let arrayCompleto: {nome:string, qtd:number, cor:string}[] = [];

    //Adiciona a qtd para cada tipo de investimento
   for(let i:number = 0; i<arrayFiltrado.length; i++){

      for(let i2:number = 0; i2<arrayNaoFiltrado.length; i2++){

        if(arrayFiltrado[i] == arrayNaoFiltrado[i2]){
          
          
        //Gerador de cores
        let cor =  '#'+(Math.random()*0xFFFFFF<<0).toString(16);


          let valida = false

          if(arrayCompleto.length == 0){

            arrayCompleto.push({nome: arrayFiltrado[i], qtd: 1, cor: cor})

          }else{

           for(let i3:number =0; i3<arrayCompleto.length; i3++){

              if(arrayCompleto[i3].nome == arrayFiltrado[i]){
                arrayCompleto[i3].qtd+=1
                valida = false;

              }else {
              
                valida = true;
                
              }


            }

              if(valida == true) {

                arrayCompleto.push({nome:arrayFiltrado[i], qtd:1, cor:cor})

              }
              

          }

        }

      }

    }
    
    
    
    //Array com a qtd de investimentos
    let arrayQtd:number[] = []

    for(let i:number = 0; i<arrayCompleto.length; i++){

       arrayQtd.push(arrayCompleto[i].qtd);


    }

    //Array de cores
    let arrayCores:string[] = []
    
    for(let i:number = 0; i<arrayCompleto.length; i++){

     arrayCores.push(arrayCompleto[i].cor)
      

    }

//Grafico de Linha
let graficoPizzaInvestimento = document.getElementById("graficoPizzaInvestimento");

//@ts-ignore
var myChart = new Chart(graficoPizzaInvestimento, {
  type: 'doughnut',
  data: {
    labels: arrayFiltrado,
    datasets: [{
      backgroundColor: 
        arrayCores         
      ,
      data: arrayQtd
    }]
  }
});

})



  }

}
