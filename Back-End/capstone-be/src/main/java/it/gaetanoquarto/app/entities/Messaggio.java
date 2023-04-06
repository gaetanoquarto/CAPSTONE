package it.gaetanoquarto.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "messaggi")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Messaggio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int id_Utente;
	
	private String username_Utente;
	
	private String messaggio;
	
	private String data;
	
	private String ora;
}
