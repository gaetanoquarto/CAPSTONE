package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Notifica;

@Repository
public interface NotificaRepo extends JpaRepository<Notifica, Integer>{

}
