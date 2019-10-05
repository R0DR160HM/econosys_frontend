import { Routes,ActivatedRoute } from '@angular/router'
import { ContaComponent } from './conta/conta.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { ServicosComponent } from './servicos/servicos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ControleComponent } from './controle/controle.component';
import { InvestimentoComponent } from './investimento/investimento.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';
import { ErrorComponent } from './core/error/error.component';
import { AdminComponent } from './admin/admin.component';
import { RedirecionarComponent } from './redirecionar/redirecionar.component';

export const ROUTES : Routes = [
{path: '', component: IndexComponent},
{path: 'login', component: LoginComponent},
{path: 'servicos', component: ServicosComponent},
{path: 'cadastro', component: CadastroComponent},
{path: 'conta', component: ContaComponent},
{path: 'controle', component: ControleComponent},
{path: 'investimento', component: InvestimentoComponent},
{path: 'estatisticas', component: EstatisticasComponent},
{path: 'erro', component: ErrorComponent},
{path: 'redirect', component: RedirecionarComponent},
{path: 'admin', component: AdminComponent}
]