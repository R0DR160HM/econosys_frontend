import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { UsuarioValidaServiceService } from '../Service/usuario-valida-service.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variáveis
  emailUsuario:string
  senhaUsuario:string
  
  //Validações
  validaEmail:boolean
  validaSenha:boolean
  emailInvalido:boolean

  //Objeto da classe Usuario
  usuarios:Usuario
  
  constructor(private usuarioValidaServico:UsuarioValidaServiceService, private router:Router) { }

  ngOnInit() {
  }


  validarEmail(){
    if(this.emailUsuario != null){
      if(this.emailUsuario.length != 0){
          this.usuarioValidaServico.findByEmailUsuario(this.emailUsuario).subscribe((usuario:Usuario)=>{
            this.usuarios=usuario;
            this.emailInvalido = false;
          },
          (error) =>{
            this.emailInvalido = true
          })
    }
    }
     }


  logar(){

    if(this.emailUsuario == "admin.econosys" && this.senhaUsuario == "aaa123"){

      let adminastrador = true;
      sessionStorage.setItem("admin", JSON.stringify(adminastrador));
      window.location.href = "/"

    }else{

    

    
      //Erros
      let emailValida:boolean = false;
      let senhaValida:boolean = false;

      let erros:number = 0;

      if(this.usuarios == null) {
        emailValida = true;
        erros++;
      }else {

    //Verifica o email
    if(this.emailUsuario == null || this.emailUsuario.length == 0) {

      emailValida = true;
      erros++;

    }

    //Verifica a Senha
    if(this.senhaUsuario == null || this.senhaUsuario.length == 0) {

      senhaValida = true;
      erros++;
    }
  
    if(this.senhaUsuario != this.usuarios.senhaUsuario) {

      senhaValida = true;
      erros++
    }
  }


    //Ativa os divs
    if(emailValida == true){
      this.validaEmail = true;
      this.emailUsuario = null
      this.senhaUsuario = null;

      document.getElementById("emailLogin").style.marginBottom = "1%";

    }else {

      document.getElementById("emailLogin").style.marginBottom = "3%";

      this.validaEmail = false;
    }


    if(senhaValida == true) {
      this.validaSenha = true
      this.senhaUsuario = null;

      document.getElementById("senhaLogin").style.marginBottom = "1%";

    }else {

      document.getElementById("senhaLogin").style.marginBottom = "3%";
      this.validaSenha = false;
    }

    //Logar o usuario
    if(erros == 0) {
  
        //Criar a session
        let sessao = { idUsuario: this.usuarios.idUsuario, nomeUsuario: this.usuarios.nomeUsuario, emailUsuario: this.usuarios.emailUsuario, senhaUsuario: this.usuarios.senhaUsuario, telUsuario: this.usuarios.telUsuario, nascUsuario: this.usuarios.nascUsuario };

        sessionStorage.setItem("usuario", JSON.stringify(sessao));

        window.location.href = "http://localhost:4200/"

    }

  }


  }

}
