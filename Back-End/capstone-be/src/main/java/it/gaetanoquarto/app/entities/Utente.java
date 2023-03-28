package it.gaetanoquarto.app.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "utenti")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Utente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	private String email;
	private String nome;
	private String cognome;
	private String password;
	private String immagineProfilo;
	
	@OneToOne
	private Provincia residenza;
	
	private boolean attivo = true;
	
	@ManyToMany
	@JoinTable(
		name = "ruoli_utenti",
		joinColumns = @JoinColumn(name = "utente_id"),
		inverseJoinColumns = @JoinColumn(name = "ruolo_id")
	)
	private Set<Ruolo> ruoli = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.LAZY)
	private Set<Amico> listaAmici = new HashSet<>();
	
	
	@ManyToMany
	@JoinTable(
			name = "notifiche_utenti",
			joinColumns = @JoinColumn(name = "utente_id"),
			inverseJoinColumns = @JoinColumn(name = "notifica_id")
		)
	private Set<Notifica> notifiche = new HashSet<>();
	

}
