import { Component, OnInit } from '@angular/core';
import { UsuarioValidaServiceService } from '../Service/usuario-valida-service.service';
import { Usuario } from '../modelos/usuario';
import { NgForOf } from '@angular/common';
import { UsuarioServiceService } from '../Service/usuario-service.service';
import { RouterModule, Router } from '@angular/router';
import { NavParcialComponent } from '../nav/nav.component';
import { error } from 'util';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //Instanciando variaveis
  nomeUsuario: string
  emailUsuario:string
  senhaUsuario:string
  conSenhaUsuario:string
  telUsuario:string
  dataNascUsuario:string
  dia:string
  mes:string
  ano:string
  
  //Validações
  nomeValida:boolean = false;
  emailValida:boolean = false;
  emailValidaEmail:boolean = false;
  senhaValida:boolean = false;
  conSenhaValida:boolean = false;
  telValida:boolean = false;
  nascValida:boolean = false;

  //Objetos de Usuarios
  usuarios:Usuario;
  usuarioCadastra = new Usuario();
  logarUsuario:Usuario;

  //Objeto da data
  datas:Date = new Date()
 
  //Construtor
  constructor(private usuarioValidaServico:UsuarioValidaServiceService, private usuarioServico:UsuarioServiceService, private router:Router) { }

  ngOnInit() {
     //Obter data
     let mesParcial:number = this.datas.getMonth()+1;
     if(mesParcial == 13){
       mesParcial = 1;
     }
 
     this.dia = ""+(this.datas.getDate());
     this.mes = ""+mesParcial;
     this.ano = ""+this.datas.getFullYear();
 
     if(this.datas.getDate()+1 < 10){
       this.dia = "0"+(this.datas.getDate());
     }
 
     if(parseInt(this.mes) < 10){
       this.mes = "0"+this.mes;
     }
  }

   //Mascara do telefone
   telefone(){

    let telefone = document.getElementsByTagName("input")[4];
    telefone.maxLength = 15;
        var caracter = telefone.value.charCodeAt(telefone.value.length-1);
        if(caracter >= 48 && caracter <=57){
            if(telefone.value.length == 1) {
                telefone.value = "("+telefone.value;
                
            } 
            if(telefone.value.length == 3) {
                telefone.value = telefone.value+") ";
            } 
            if(telefone.value.length == 10) {
                telefone.value = telefone.value+"-";
            } 
        }else{
            telefone.value = telefone.value.substr(0, telefone.value.length-1);
        }
        
     
 }

 //Mascara da data de nascimento
 nascimento() {

    let nasc = document.getElementsByTagName("input")[5];
    nasc.maxLength = 10;
      let caracter = nasc.value.charCodeAt(nasc.value.length-1);
        if(caracter >= 48 && caracter <=57){
          if(nasc.value.length == 2) {
              nasc.value = nasc.value+"/";
              
          } 
          if(nasc.value.length == 5) {
              nasc.value = nasc.value+"/";
          } 
      
      }else{
          nasc.value = nasc.value.substr(0, nasc.value.length-1);
      }
 }

 //Verifica se o email existe
 validarEmail(){
if(this.emailUsuario != null){
  if(this.emailUsuario.length != 0){
    this.usuarioValidaServico.findByEmailUsuario(this.emailUsuario).subscribe((usuario:Usuario)=>{
    this.usuarios=usuario;
    this.emailValida = false
  },
  (error) => {
    this.emailValida = true;
  })
}
}
 }

  //Limita o tamanho do nome
  tamanhoNome(){
    let nome = document.getElementsByTagName("input")[0];
    nome.maxLength = 40;

  }

  //Limita o tamanho do email
  tamanhoEmail(){
    let email = document.getElementsByTagName("input")[1];
    email.maxLength = 40;
  }

  //Limita o tamanho do email
  tamanhoSenha(){
    let senha = document.getElementsByTagName("input")[2];
    senha.maxLength = 40;
  }


  //Valida o cadastro
  cadastrar() {

      //Contagem de erros
      let erros:number = 0;

      //Verfificacoes
      let erroNome:boolean = false;
      let erroEmail:boolean = false;
      let erroEmailEmail:boolean = false;
      let erroSenha:boolean = false;
      let erroConSenha:boolean = false;
      let erroTel:boolean = false;
      let erroNasc:boolean = false;

      //Validando o campo Nome
      if((this.nomeUsuario == null) || (this.nomeUsuario.length == 0) || (this.nomeUsuario.length > 40))  {
        erroNome = true;
        erros++;
      }



      //Validando o campo Email
      if(this.usuarios != null) {
        erroEmailEmail = true;
        erros++;
      }else if (this.emailUsuario == null || this.emailUsuario.length == 0 || this.emailUsuario.length > 40) {									
				erroEmail = true;
				erros++;
			}else {


			

        //Verifica a existencia de @ e . no email
        let emailArroba:number = 0;
        let emailPonto:number = 0;

          for(let i:number=0; i<this.emailUsuario.length; i++) {

            let caracter:number = this.emailUsuario.charCodeAt(i);
            
            if(caracter == 64) {
              emailArroba++;
            }

            if(caracter == 46){
              emailPonto++;
            }
          }

          if(emailArroba != 1) {
            erros++;
            erroEmail = true;
          }

          if(emailPonto  < 1) {
            erros++;
            erroEmail = true;
          }

      }

      //Valida o campo Senha
			if(this.senhaUsuario == null || this.senhaUsuario.length < 8 || this.senhaUsuario.length > 30){				
		
				erroSenha = true;
				erros++;
				
			}
			
			//Verifica a existencia de numeros e letras na senha		
			let senhaNums:number = 0;
			let senhaLetras:number = 0;
      
      if(this.senhaUsuario == null) {
        erroSenha = true;
        erros++;
      
      }else{

			for(let i:number=0; i<this.senhaUsuario.length; i++){
				
				let caracter:number = this.senhaUsuario.charCodeAt(i);
			
				if(caracter >= 48 && caracter <=57 ){
					senhaNums++;
				}
				
				if((caracter >= 65 && caracter <=90) || (caracter >=97 && caracter <= 122)){
					senhaLetras++;
				}
				
			}
			
			if(senhaNums == 0){
			
				erroSenha = true;
				erros++;
				
			}
			
			if(senhaLetras == 0){
				
				erroSenha = true;
				erros++;
				
			}
    }

      //Valida o campo Confirme a Senha
        if(this.senhaUsuario != this.conSenhaUsuario){
                        
          erroConSenha = true;
          erros++;
        }

      //Valida o campo telefone
      if(this.telUsuario == null) {
        erroTel = true;
        erros++;

      }else {
    
        for(var i=0; i<this.telUsuario.length; i++){

          if((i != 0) && (i != 3) && (i != 4) && (i != 10)){
                          
            }else if((i == 0) && (this.telUsuario.charAt(i) == "(")){
            }else if((i == 3) && (this.telUsuario.charAt(i) == ")")){
            }else if((i == 4) && (this.telUsuario.charAt(i) == " ")){
            }else if((i == 10) && (this.telUsuario.charAt(i) == "-")){	 
            }else{
                                
              erroTel = true;
              erros++;
              
            }
          
        }
        
        if ((this.telUsuario.charCodeAt(1) >= 48 && this.telUsuario.charCodeAt(1) <=57) && (this.telUsuario.charCodeAt(2) >= 48 && this.telUsuario.charCodeAt(2) <=57) && (this.telUsuario.charCodeAt(5) >= 48 && this.telUsuario.charCodeAt(5) <=57) && (this.telUsuario.charCodeAt(6) >= 48 && this.telUsuario.charCodeAt(6) <=57) && (this.telUsuario.charCodeAt(7)>= 48 && this.telUsuario.charCodeAt(7) <=57) && (this.telUsuario.charCodeAt(8) >= 48 && this.telUsuario.charCodeAt(8) <=57) && (this.telUsuario.charCodeAt(9) >= 48 && this.telUsuario.charCodeAt(9) <=57) && (this.telUsuario.charCodeAt(11)>= 48 && this.telUsuario.charCodeAt(11) <=57) && (this.telUsuario.charCodeAt(12) >= 48 && this.telUsuario.charCodeAt(12) <=57) && (this.telUsuario.charCodeAt(13)>= 48 && this.telUsuario.charCodeAt(13) <=57) && (this.telUsuario.charCodeAt(14)>= 48 && this.telUsuario.charCodeAt(14) <=57)){
          
        }else {
                
            erroTel = true;
          erros++;
        }
    }

      //Valida o campo Data de Nascimento
      if(this.dataNascUsuario == null) {
        erroNasc = true;
			  erros++;

      }else {
			for(var i=0; i<this.dataNascUsuario.length; i++){

				if((i != 2) && (i != 5)){
				
				}else if((i == 2) && (this.dataNascUsuario.charAt(i) == "/")){
			  	 }else if((i == 5) && (this.dataNascUsuario.charAt(i) == "/")){
			   	 }else{			   		 
			   				    	
			    	erroNasc = true;
			   		erros++;
			   	 }
				
			}
			
			if((this.dataNascUsuario.charCodeAt(0) >= 48 && this.dataNascUsuario.charCodeAt(0) <=57) && (this.dataNascUsuario.charCodeAt(1) >= 48 && this.dataNascUsuario.charCodeAt(1) <=57) && (this.dataNascUsuario.charCodeAt(3) >= 48 && this.dataNascUsuario.charCodeAt(3) <=57) && (this.dataNascUsuario.charCodeAt(4) >= 48 && this.dataNascUsuario.charCodeAt(4) <=57) && (this.dataNascUsuario.charCodeAt(6) >= 48 && this.dataNascUsuario.charCodeAt(6) <=57) && (this.dataNascUsuario.charCodeAt(7) >= 48 && this.dataNascUsuario.charCodeAt(7) <=57) && (this.dataNascUsuario.charCodeAt(8) >= 48 && this.dataNascUsuario.charCodeAt(8) <=57) && (this.dataNascUsuario.charCodeAt(9) >= 48 && this.dataNascUsuario.charCodeAt(9) <=57)) {
				
			}else{
	
				erroNasc = true;
				erros++;
				
      }
      
      let datas:string[] = this.dataNascUsuario.split("/");
      if (datas[2] >= this.ano){		    	
        erroNasc = true;
        erros++;
      }else if(datas[2] == this.ano && datas[1] >= this.mes){
        erroNasc = true;
        erros++;
      }else if(datas[2] == this.ano && datas[1] == this.mes && datas[0] >= this.dia){
        erroNasc = true;
        erros++;
      }

    }

      //Ativa os div de erros

      //Nome
      if(erroNome == true) {

        //Limpa o campo
        this.nomeUsuario = null;

        this.nomeValida = true;

      }else {


        this.nomeValida = false;
      }

      //Email
      if(erroEmail == true) {

        //Limpa os campo
        this.emailUsuario = null;

        this.emailValida = true;
        this.emailValidaEmail = false;


      }else if(erroEmailEmail == true){
        
        //Limpa os campo
        this.emailUsuario = null;

        this.emailValida = false;
        this.emailValidaEmail = true;

        
      }else {

        this.emailValida = false;
      }

      //Senha
      if(erroSenha == true) {

        //Limpa os campos
        this.senhaUsuario = null;
        this.conSenhaUsuario = null;

        this.senhaValida = true;


      }else {


        this.senhaValida = false;
      }

      //ConSenha
      if(erroConSenha == true) {

        //Limpa os campos
        this.senhaUsuario = null;
        this.conSenhaUsuario = null;

        this.conSenhaValida = true;


      }else {


        this.conSenhaValida = false;
      }

      //Telefone
      if(erroTel == true) {

        //Limpa o campo
        this.telUsuario = null;

        this.telValida = true;


      }else {

        this.telValida = false;
      }

      //Data de nascimento
      if(erroNasc == true) {

        //Limpa o campo
        this.dataNascUsuario = null;

        this.nascValida = true;

      }else {

        this.nascValida = false;

      }
    
      //Cadastra o usuario
      if(erros == 0) {
        this.usuarioCadastra.nomeUsuario = this.nomeUsuario
        this.usuarioCadastra.emailUsuario = this.emailUsuario
        this.usuarioCadastra.senhaUsuario = this.senhaUsuario
        this.usuarioCadastra.telUsuario = this.telUsuario
        this.usuarioCadastra.nascUsuario = this.dataNascUsuario

        this.usuarioServico.save(this.usuarioCadastra).subscribe((usuario:Usuario)=>{ 
         
         //Criar a session
         let conta:boolean = true;
         let sessao:Usuario = { idUsuario: usuario.idUsuario,nomeUsuario: this.usuarioCadastra.nomeUsuario, emailUsuario: this.usuarioCadastra.emailUsuario, senhaUsuario: this.usuarioCadastra.senhaUsuario, telUsuario: this.usuarioCadastra.telUsuario, nascUsuario: this.usuarioCadastra.nascUsuario };
         sessionStorage.setItem("usuario", JSON.stringify(sessao));
         sessionStorage.setItem("novaConta", JSON.stringify(conta));
         
         //Redireciona o usuario
         window.location.href = "http://localhost:4200/"
        })
               
      }
  }
}