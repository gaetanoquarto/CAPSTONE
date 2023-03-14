package it.gaetanoquarto.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.Notifica;
import it.gaetanoquarto.app.repositories.NotificaRepo;

@Service
public class NotificaService {
	
	@Autowired
	private NotificaRepo nr;
	
	public Notifica save(Notifica n) {
		return nr.save(n);
	}
	
	public Optional<Notifica> getById(int id) {
		return nr.findById(id);
	}
	
	public List<Notifica> getAll() {
		return nr.findAll();
	}
	
	public Page<Notifica> getAll_page(Pageable pageable) {
		return nr.findAll(pageable);
	}
	
	public void delete(Notifica n) {
		nr.delete(n);
	}

}
