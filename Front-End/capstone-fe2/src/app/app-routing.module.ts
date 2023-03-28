import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CentriSportiviComponent } from './components/admin-dashboard/centri-sportivi/centri-sportivi.component';
import { CreaPartitaComponent } from './components/crea-partita/crea-partita.component';
import { GestionePartitaComponent } from './components/gestione-partita/gestione-partita.component';
import { ListaPartiteComponent } from './components/lista-partite/lista-partite.component';
import { ProfiloComponent } from './components/profilo/profilo.component';

const routes: Routes = [
  {
    path: 'crea-partita',
    component: CreaPartitaComponent
  },
  {
    path: 'gioca',
    component: ListaPartiteComponent,
  },
  {
    path: 'partita/:id',
    component: GestionePartitaComponent,
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'centri-sportivi',
        component: CentriSportiviComponent
      }
    ]
  },
  {
    path: 'user/:id',
    component: ProfiloComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
