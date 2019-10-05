import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { UsuarioValidaServiceService } from '../Service/usuario-valida-service.service';
import { UsuarioServiceService } from '../Service/usuario-service.service';
import { DepositoUsuarioServiceService } from '../Service/deposito-usuario-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  //Objeto sessao contendo os dados do Usuario
  dadosDoUsuario:Usuario = JSON.parse(sessionStorage.getItem("usuario"));

  //Variaveis
  nomeUsuario:string;
  emailUsuario:string;
  senhaUsuario:string;
  conSenhaUsuario:string;
  telUsuario:string;
  dataNascUsuario:string;

  //Validacoes
  nomeValida:boolean
  emailValida:boolean
  emailValidaEmail:boolean
  senhaValida:boolean
  conSenhaValida:boolean
  telValida:boolean
  nascValida:boolean

  //Alteradores
  nome2:string;
  email2:string;
  tel2:string;
  data2:string;

  //Objeto da classe usuario
  validaUsuarioEmail:Usuario;
  usuarioDados:Usuario;

  //Construtor
  constructor(private usuarioValidaServico:UsuarioValidaServiceService, private usuarioServico:UsuarioServiceService, private depositoUsuarioServico:DepositoUsuarioServiceService, private route:Router) { }

  //Ao iniciar
  ngOnInit() {

    //Verifca se esta logado
    let sessao = JSON.parse(sessionStorage.getItem("usuario"));

    if(sessao == null){

      let sessaoExpirada:boolean = true;
      sessionStorage.setItem("sessaoExpirada", JSON.stringify(sessaoExpirada));
      this.route.navigate(["/"]);

    }
 
    //-------------------------------------------------------------------------------------

    

    //Define o valor dos alteradores
    this.nome2 = this.dadosDoUsuario.nomeUsuario;
    this.email2 = this.dadosDoUsuario.emailUsuario;
    this.tel2 = this.dadosDoUsuario.telUsuario;
    this.data2 = this.dadosDoUsuario.nascUsuario
  }

  //Mascara do telefone
  telefone(){

    var telefone = document.getElementsByTagName("input")[4];
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

    var nasc = document.getElementsByTagName("input")[5];
    nasc.maxLength = 10;
      var caracter = nasc.value.charCodeAt(nasc.value.length-1);
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

 //Valida se o email ja existe
 validarEmail(){

  if(this.emailUsuario != null){
    if(this.emailUsuario.length != 0){
      this.usuarioValidaServico.findByEmailUsuario(this.emailUsuario).subscribe((usuario:Usuario)=>{
      this.validaUsuarioEmail=usuario;
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


 //Altera os dados do usuario
 alterarConta(){

    //Dados antigos
    this.usuarioDados = JSON.parse(sessionStorage.getItem("usuario"));

    //Contagem de erros
    let erros:number = 0;

    //Contagem das mudancas
    let mudancas:number = 0;

    //Verfificacoes
    let erroNome:boolean = false;
    let erroEmail:boolean = false;
    let erroEmailEmail:boolean = false;
    let erroSenha:boolean = false;
    let erroConSenha:boolean = false;
    let erroTel:boolean = false;
    let erroNasc:boolean = false;

    //Valida se houve alteracao no usuario
    let alterouNome:boolean = false;    
    let alterouEmail:boolean = false;
    let alterouSenha:boolean = false;
    let alterouTel:boolean = false;
    let alterouData:boolean = false;

    //Alterar o nome
    if(this.nomeUsuario != null) {
      if(this.nomeUsuario.length > 0) {

          //Validando o nome
          if(this.nomeUsuario.length > 40) {
            erros++;
            erroNome = true;
          }else {
            alterouNome = true;
            mudancas++;
          }
    }
  }
    //Alterar o email
    if(this.emailUsuario != null) {
      if(this.emailUsuario.length > 0) {

        //Validando o email
        if(this.validaUsuarioEmail != null){
          erros++;
          erroEmailEmail = true;
        }else if(this.emailUsuario.length > 40){
          erros++;
          erroEmail = true;
        }else {
          
        

        //Verifica a existencia de @ e . no email
        let emailArroba:number = 0;
        let emailPonto:number = 0;

          for(let i=0; i<this.emailUsuario.length; i++) {

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
        if(erroEmail == false && erroEmailEmail == false) {
          alterouEmail = true;
          mudancas++;
        }


    }
  }
    //Alterar senha
    if(this.senhaUsuario != null) {
      if(this.senhaUsuario.length > 0) {
   
        //Validando a senha
        if(this.senhaUsuario.length > 30 || this.senhaUsuario.length < 8) {
          erros++;
          erroSenha = true;
        }

        //Verifica a existencia de numeros e letras na senha		
        let senhaNums:number = 0;
        let senhaLetras:number = 0;

        for(var i=0; i<this.senhaUsuario.length; i++){
          
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
    
        if(erroSenha == false){
          alterouSenha = true;
          mudancas++;
        }

    }
  }

    //Valida o campo Confirme a Senha
    if(this.senhaUsuario != this.conSenhaUsuario){
                        
      erroConSenha = true;
      erros++;
    }

    //Alterar o telefone
    if(this.telUsuario != null) {
      if(this.telUsuario.length > 0) {

        //Validando o telefone
        for(let i:number=0; i<this.telUsuario.length; i++){

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
   
        if(erroTel == false) {
          alterouTel = true;
          mudancas++;
        }
   
     }
  }
  
    //Alterar a data de nascimento
    if(this.dataNascUsuario != null) {
      if(this.dataNascUsuario.length > 0) {
  
        //Validando a data de nascimento
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
  
        if(erroNasc == false) {
          alterouData = true;
          mudancas++;
        }

     }
  } 

      //Ativa os divs de erro
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

        this.emailValidaEmail = true;
        this.emailValida = false;
        
      }else {
        

        this.emailValida = false;
        this.emailValidaEmail = false;
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


        //Espaço nos divs
      }else {

        this.nascValida = false;
      }


      if(mudancas == 0) {
      }else {
        //Altera os dados do usuario
      if(erros == 0) {

        //Muda o nome
        if(alterouNome == true) {
          this.usuarioDados.nomeUsuario = this.nomeUsuario;
          this.nomeUsuario = null;
        }

        //Muda o email
        if(alterouEmail == true) {
          this.usuarioDados.emailUsuario = this.emailUsuario;
          this.emailUsuario = null;
        } 

        //Muda a senha 
        if(alterouSenha == true) {
          this.usuarioDados.senhaUsuario = this.senhaUsuario;
          this.senhaUsuario = null;
          this.conSenhaUsuario = null;
        }

        //Muda o telefone
        if(alterouTel == true) {
          this.usuarioDados.telUsuario = this.telUsuario;
          this.telUsuario = null;
        }

        //Muda a data de nascimento
        if(alterouData == true) {
          this.usuarioDados.nascUsuario = this.dataNascUsuario;
          this.dataNascUsuario =null;
        }

        //Cadastra o usuario
        this.usuarioServico.atualiza(this.usuarioDados).subscribe((data)=>{
          
          //Muda os dados da session
          sessionStorage.clear();
          sessionStorage.setItem("usuario", JSON.stringify(this.usuarioDados));

          console.log(this.usuarioDados);

          //Altera os placeholders
          this.nome2 = this.usuarioDados.nomeUsuario;
          this.email2 = this.usuarioDados.emailUsuario;
          this.tel2 = this.usuarioDados.telUsuario;
          this.data2 = this.usuarioDados.nascUsuario;
        })
     
     
      }
    }

      

}


//Exclui a conta do usuario
excluirConta(){

  let sessao:Usuario = JSON.parse(sessionStorage.getItem("usuario"));

  this.usuarioDados = sessao;

  this.usuarioServico.delete(this.usuarioDados.idUsuario).subscribe(()=>{})

  sessionStorage.clear();

  //Redireciona o usuario
  window.location.href = "http://localhost:4200/"

}




}
