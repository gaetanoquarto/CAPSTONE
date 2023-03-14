package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Ruolo;

@Repository
public interface RuoloRepo extends JpaRepository<Ruolo, Integer>{

}
