package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Amico;

@Repository
public interface AmicoRepo extends JpaRepository<Amico, Integer>{

}
