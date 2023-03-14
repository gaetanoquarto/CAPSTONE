package it.gaetanoquarto.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Utente;

@Repository
public interface UtenteRepo extends JpaRepository<Utente, Integer>{
	
	Optional<Utente> findByUsername(String n);

}
