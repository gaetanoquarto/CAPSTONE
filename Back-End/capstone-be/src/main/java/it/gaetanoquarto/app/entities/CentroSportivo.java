package it.gaetanoquarto.app.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "centriSportivi")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class CentroSportivo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String nomeCentroSportivo;
	
	@OneToOne
	private Provincia cittàCentroSportivo;
	
	@OneToMany
	@JoinTable(
			name = "lista_campi",
			joinColumns = @JoinColumn(name = "centro_sportivo_id"),
			inverseJoinColumns = @JoinColumn(name = "campo_id")
		)
	private List<Campo> listaCampi;

}
