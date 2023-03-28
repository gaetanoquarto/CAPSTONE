package it.gaetanoquarto.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.Amico;
import it.gaetanoquarto.app.entities.Campo;
import it.gaetanoquarto.app.entities.Provincia;
import it.gaetanoquarto.app.repositories.AmicoRepo;

@Service
public class AmicoService {
	
	@Autowired
	private AmicoRepo ar;
	
	public Amico save(Amico a) {
		return ar.save(a);
	}

	public Optional<Amico> getById(int id) {
		return ar.findById(id);
	}
	
	public List<Amico> getAll() {
		return ar.findAll();
	}
}
