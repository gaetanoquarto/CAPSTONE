import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CentriSportiviComponent } from './components/admin-dashboard/centri-sportivi/centri-sportivi.component';
import { CreaPartitaComponent } from './components/crea-partita/crea-partita.component';
import { GestionePartitaComponent } from './components/gestione-partita/gestione-partita.component';
import { HomeComponent } from './components/home/home.component';
import { ListaPartiteComponent } from './components/lista-partite/lista-partite.component';
import { ProfiloComponent } from './components/profilo/profilo.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'crea-partita',
    component: CreaPartitaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gioca',
    component: ListaPartiteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'partita/:id',
    component: GestionePartitaComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'centri-sportivi',
        component: CentriSportiviComponent
      }
    ]
  },
  {
    path: 'user/:id',
    component: ProfiloComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
