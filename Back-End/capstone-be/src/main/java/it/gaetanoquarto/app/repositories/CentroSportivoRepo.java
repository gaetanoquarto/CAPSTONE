package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.CentroSportivo;

@Repository
public interface CentroSportivoRepo extends JpaRepository<CentroSportivo, Integer>{

}
