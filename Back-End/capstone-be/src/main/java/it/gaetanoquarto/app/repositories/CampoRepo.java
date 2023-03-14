package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Campo;

@Repository
public interface CampoRepo extends JpaRepository<Campo, Integer>{

}
