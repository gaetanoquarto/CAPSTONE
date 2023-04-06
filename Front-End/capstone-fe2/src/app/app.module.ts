import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { ListaPartiteComponent } from './components/lista-partite/lista-partite.component';
import { GestionePartitaComponent } from './components/gestione-partita/gestione-partita.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CentriSportiviComponent } from './components/admin-dashboard/centri-sportivi/centri-sportivi.component';
import { CreaPartitaComponent } from './components/crea-partita/crea-partita.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderByPipe } from './pipe/order-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfiloComponent,
    ListaPartiteComponent,
    GestionePartitaComponent,
    NavbarComponent,
    AdminDashboardComponent,
    CentriSportiviComponent,
    CreaPartitaComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    FormsModule,
    AuthModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
