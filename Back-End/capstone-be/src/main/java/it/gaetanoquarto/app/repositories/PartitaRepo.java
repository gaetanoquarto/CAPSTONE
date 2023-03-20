package it.gaetanoquarto.app.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Partita;

@Repository
public interface PartitaRepo extends JpaRepository<Partita, Integer>{

	List<Partita> findByCittaAndGiornoPartita(@Param("citta") String citta, @Param("giorno") LocalDate giorno);


}
