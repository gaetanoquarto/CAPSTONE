package it.gaetanoquarto.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.gaetanoquarto.app.entities.CentroSportivo;
import it.gaetanoquarto.app.entities.Provincia;
import it.gaetanoquarto.app.repositories.CentroSportivoRepo;

@Service
public class CentroSportivoService {
	
	@Autowired
	private CentroSportivoRepo csr;

	public CentroSportivo save(CentroSportivo cs) {
		return csr.save(cs);
	}
	
	public Optional<CentroSportivo> getById(int id) {
		return csr.findById(id);
	}
	
	public List<CentroSportivo> getAll() {
		return csr.findAll();
	}
	
	public Page<CentroSportivo> getAll_page(Pageable pageable) {
		return csr.findAll(pageable);
	}
	
	public void delete(CentroSportivo cs) {
		csr.delete(cs);
	}
	
	public List<CentroSportivo> getByCitta(Provincia citta) {
		return csr.findByCittaCentroSportivo(citta);
	}
}
