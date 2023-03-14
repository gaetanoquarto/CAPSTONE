package it.gaetanoquarto.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.Campo;
import it.gaetanoquarto.app.repositories.CampoRepo;

@Service
public class CampoService {
	
	@Autowired
	private CampoRepo cr;
	
	public Campo save(Campo c) {
		return cr.save(c);
	}
	
	public Optional<Campo> getById(int id) {
		return cr.findById(id);
	}
	
	public List<Campo> getAll() {
		return cr.findAll();
	}
	
	public Page<Campo> getAll_page(Pageable pageable) {
		return cr.findAll(pageable);
	}
	
	public void delete(Campo c) {
		cr.delete(c);
	}

}
