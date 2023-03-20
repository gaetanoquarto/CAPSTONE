package it.gaetanoquarto.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.CentroSportivo;
import it.gaetanoquarto.app.entities.Provincia;

@Repository
public interface CentroSportivoRepo extends JpaRepository<CentroSportivo, Integer>{
	
	public List<CentroSportivo> findByCittaCentroSportivo(Provincia citta);

}
