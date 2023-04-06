package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Messaggio;

@Repository
public interface MessaggioRepo extends JpaRepository<Messaggio, Integer>{

}
