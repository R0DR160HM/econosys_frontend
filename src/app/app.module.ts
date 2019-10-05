import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContaComponent } from './conta/conta.component';
import { FooterComponent } from './footer/footer.component';
import { NavParcialComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.route';
import { IndexComponent } from './index/index.component';
import { ServicosComponent } from './servicos/servicos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ControleComponent } from './controle/controle.component';
import { DepositoServiceService } from './Service/deposito-service.service';
import { InvestimentoComponent } from './investimento/investimento.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';
import { ErrorComponent } from './core/error/error.component';
import { GlobalErrorHandlerService } from './core/global-error-handler.service';
import { AdminComponent } from './admin/admin.component';
import { RedirecionarComponent } from './redirecionar/redirecionar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContaComponent,
    FooterComponent,
    NavParcialComponent,
    LoginComponent,
    IndexComponent,
    ServicosComponent,
    CadastroComponent,
    ControleComponent,
    InvestimentoComponent,
    EstatisticasComponent,
    ErrorComponent,
    AdminComponent,
    RedirecionarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
