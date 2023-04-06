package it.gaetanoquarto.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.Messaggio;
import it.gaetanoquarto.app.repositories.MessaggioRepo;

@Service
public class MessaggioService {
	
	@Autowired
	private MessaggioRepo mr;
	
	public Messaggio save(Messaggio m) {
		return mr.save(m);
	}
	
	public Optional<Messaggio> getById(int id) {
		return mr.findById(id);
	}
	
	public void delete(Messaggio m) {
		mr.delete(m);
	}

}
