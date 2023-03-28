package it.gaetanoquarto.app.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Utente;

@Repository
public interface UtenteRepo extends JpaRepository<Utente, Integer>{
	
	Optional<Utente> findByUsername(String n);
	
	@Query(
		    nativeQuery = true,
		    value = "SELECT * FROM utenti WHERE LOWER(username) LIKE LOWER(CONCAT('%', :fn, '%'))"
		)
	List<Utente> findByParUsername(@Param("fn") String username);

}
