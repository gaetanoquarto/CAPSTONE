package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Provincia;

@Repository
public interface ProvinciaRepo extends JpaRepository<Provincia, Integer>{

}
