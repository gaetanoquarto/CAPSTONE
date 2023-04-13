package it.gaetanoquarto.app.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.CentroSportivo;
import it.gaetanoquarto.app.entities.Partita;
import it.gaetanoquarto.app.entities.Provincia;
import it.gaetanoquarto.app.services.PartitaService;

@RestController
@RequestMapping("/api/")
public class PartitaController {
	
	@Autowired
	private PartitaService ps;
	
	@GetMapping("partite")
	public ResponseEntity<List<Partita>> getPartite() {
		List<Partita> partite = ps.getAll();
		
		return new ResponseEntity<>(partite, HttpStatus.CREATED);
	}
	
	@GetMapping("partite/{id}")
	public ResponseEntity<Object> getPartitaById(@PathVariable int id) {
		Optional<Partita> partitaObj = ps.getById(id);
		
		ResponseEntity<Object> check = checkExists(partitaObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(partitaObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("partite_page")
	public ResponseEntity<Object> getPartiteInPages(Pageable pageable) {
		Page<Partita> partite = ps.getAll_page(pageable);
		
		if(partite.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(partite, HttpStatus.OK);
	}
	
	@PostMapping("partite")
	public ResponseEntity<Object> creaPartita(@RequestBody Partita p) {
		
		Partita partita = ps.save(p);
		
		return new ResponseEntity<Object>(partita, HttpStatus.CREATED);
	}
	
	@PutMapping("partite/{id}")
	public ResponseEntity<Object> updatePartita(@PathVariable int id, @RequestBody Partita _partita) {
		Optional<Partita> partitaObj = ps.getById(id);
		
		ResponseEntity<Object> check = checkExists(partitaObj);
		if(check != null) return check;
		
		Partita partita = partitaObj.get();
		
		partita.setCentroSportivo(_partita.getCentroSportivo());
		partita.setNomePartita(_partita.getNomePartita());
		partita.setTipoPartita(_partita.getTipoPartita());
		partita.setGiornoPartita(_partita.getGiornoPartita());
		partita.setOraPartita(_partita.getOraPartita());
		partita.setListaPartecipanti(_partita.getListaPartecipanti());
		partita.setCampo(_partita.getCampo());
		ps.save(partita);
		
		return new ResponseEntity<Object>(partita, HttpStatus.CREATED);
	}
	
	@DeleteMapping("partite/{id}")
	public ResponseEntity<Object> deletePartita(@PathVariable int id) {
		Optional<Partita> partitaObj = ps.getById(id);
		
		ResponseEntity<Object> check = checkExists(partitaObj);
		if(check != null) return check;
		
		ps.delete(partitaObj.get());
		
		return new ResponseEntity<>(
			HttpStatus.OK	
		);
	}
	
	@GetMapping("partite/ricerca")
	public List<Partita> cercaPerCittaAndGiorno(@RequestParam("citta") String citta, @RequestParam("giorno") String giorno) {
		return ps.getByCittaAndGiorno(citta, giorno);
	}
	
	
	
	//controllo SE esiste
		private ResponseEntity<Object> checkExists(Optional<Partita> obj) {
			if( !obj.isPresent() ) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return null;
		}

}
