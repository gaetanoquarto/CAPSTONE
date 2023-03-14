package it.gaetanoquarto.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import it.gaetanoquarto.app.entities.Campo;
import it.gaetanoquarto.app.entities.CentroSportivo;
import it.gaetanoquarto.app.entities.Notifica;
import it.gaetanoquarto.app.entities.Partita;
import it.gaetanoquarto.app.entities.Provincia;
import it.gaetanoquarto.app.entities.Ruolo;
import it.gaetanoquarto.app.entities.Utente;
import it.gaetanoquarto.app.entities.enums.TipoCampo;
import it.gaetanoquarto.app.entities.enums.TipoNotifica;
import it.gaetanoquarto.app.entities.enums.TipoRuolo;

@Configuration
public class Beans {
	
	@Bean
	@Scope("prototype")
	public Utente utente(String nome, String cognome, String username, String email, String password, Provincia provincia) {
		return Utente.builder()
				.nome(nome)
				.cognome(cognome)
				.residenza(provincia)
				.username(username)
				.email(email)
				.password(password)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Ruolo ruolo(TipoRuolo tipo) {
		
		return Ruolo.builder()
				.ruolo(tipo)
				.build();
		
	}
	
	
	@Bean
	@Scope("prototype")
	public Campo campo(TipoCampo tipo, int maxPartecipanti) {
		return Campo.builder()
				.tipoCampo(tipo)
				.maxPartecipanti(maxPartecipanti)
				.build();
	}
//	
//	@Bean
//	@Scope("prototype")
//	public CentroSportivo centroSportivo(String nome, Provincia città) {
//		return CentroSportivo.builder()
//				.nomeCentroSportivo(nome)
//				.cittàCentroSportivo(città)
//				.build();
//	}
//	
//	@Bean
//	@Scope("prototype")
//	public Notifica notifica(TipoNotifica tipo, int mittente, int destinatario, Partita partita) {
//		return Notifica.builder()
//				.tipoNotifica(tipo)
//				.idMittente(mittente)
//				.idDestinatario(destinatario)
//				.partita(partita)
//				.build();
//	}
//	
//	@Bean
//	@Scope("prototype")
//	public Partita partita(CentroSportivo centroSportivo, Utente organizzatore, String nomePartita, int maxPartecipanti, ) {
//		return Partita.builder()
//				
//				.build();
//	}

}
