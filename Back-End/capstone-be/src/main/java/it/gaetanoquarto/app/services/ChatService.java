package it.gaetanoquarto.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.Campo;
import it.gaetanoquarto.app.entities.Chat;
import it.gaetanoquarto.app.repositories.ChatRepo;

@Service
public class ChatService {
	
	@Autowired
	private ChatRepo cr;
	
	public Chat save(Chat c) {
		return cr.save(c);
	}
	
	public Optional<Chat> getById(int id) {
		return cr.findById(id);
	}
	
	public void delete(Chat c) {
		cr.delete(c);
	}

}
