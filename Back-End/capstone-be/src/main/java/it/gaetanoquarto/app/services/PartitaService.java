package it.gaetanoquarto.app.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.Partita;
import it.gaetanoquarto.app.repositories.PartitaRepo;

@Service
public class PartitaService {
	
	@Autowired
	private PartitaRepo pr;
	
	public Partita save(Partita p) {
		return pr.save(p);
	}
	
	public Optional<Partita> getById(int id) {
		return pr.findById(id);
	}
	
	public List<Partita> getAll() {
		return pr.findAll();
	}
	
	public Page<Partita> getAll_page(Pageable pageable) {
		return pr.findAll(pageable);
	}
	
	public void delete(Partita p) {
		pr.delete(p);
	}
	
	public List<Partita> getByCittaAndGiorno(String citta, String giorno) {
		return pr.findByCittaAndGiornoPartita(citta, LocalDate.parse(giorno));
	}

}
