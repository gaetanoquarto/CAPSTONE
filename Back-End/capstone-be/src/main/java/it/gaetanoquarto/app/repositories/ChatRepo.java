package it.gaetanoquarto.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.gaetanoquarto.app.entities.Chat;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer>{

}
