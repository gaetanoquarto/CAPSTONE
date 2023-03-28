package it.gaetanoquarto.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import it.gaetanoquarto.app.entities.enums.TipoPartita;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "partite")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Partita {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	private CentroSportivo CentroSportivo;
	
	private String Organizzatore;
	
	private String nomePartita;
	private String campo;
	private String citta;
	
	
	@ManyToMany
	@JoinTable(
			name = "partecipanti_partita",
			joinColumns = @JoinColumn(name = "partita_id"),
			inverseJoinColumns = @JoinColumn(name = "utente_id")
		)
	private List<Utente> listaPartecipanti = new ArrayList<>();
	
	@Enumerated(EnumType.STRING)
	private TipoPartita tipoPartita;
	
	private LocalDate giornoPartita;
	
	private String oraPartita;	
	

}
