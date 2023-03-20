package it.gaetanoquarto.app.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.Ruolo;
import it.gaetanoquarto.app.entities.Utente;
import it.gaetanoquarto.app.services.RuoloService;
import it.gaetanoquarto.app.services.UtenteService;


@RestController
@RequestMapping("/api/")
public class UtenteController {
	
	@Autowired
	private UtenteService us;
	

	//ottieni lista utenti
	@GetMapping("utenti")
	public ResponseEntity<List<Utente>> getUtenti() {
		List<Utente> utenti = us.getAll();
		
		return new ResponseEntity<>(utenti, HttpStatus.CREATED);
	}
	
	//ottieni utente dall'id
	@GetMapping("utenti/{id}")
	public ResponseEntity<Object> getUtenteById(@PathVariable int id) {
		Optional<Utente> utenteObj = us.getById(id);
		
		ResponseEntity<Object> check = checkExists(utenteObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(utenteObj.get(), HttpStatus.OK);
	}
	
	//ottieni pagina utenti
	@GetMapping("utenti_page")
	public ResponseEntity<Object> getUtentiInPages(Pageable pageable) {
		Page<Utente> utenti = us.getAll_page(pageable);
		
		if(utenti.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(utenti, HttpStatus.OK);
	}
	
	//modifica un utente
	@PutMapping("utenti/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> updateUtente(@PathVariable int id, @RequestBody Utente _utente) {
		Optional<Utente> utenteObj = us.getById(id);
		
		ResponseEntity<Object> check = checkExists(utenteObj);
		if(check != null) return check;
		
		Utente utente = utenteObj.get();
		
		utente.setUsername(_utente.getUsername());
		utente.setEmail(_utente.getUsername());
		utente.setPassword(_utente.getPassword());
		utente.setNome(_utente.getNome());
		utente.setCognome(_utente.getCognome());
		utente.setResidenza(_utente.getResidenza());
		utente.setImmagineProfilo(_utente.getImmagineProfilo());
		utente.setRuoli(_utente.getRuoli());
		
		us.save(utente);
		
		return new ResponseEntity<Object>(utente, HttpStatus.CREATED);
	}
	
	//elimina un utente
	@DeleteMapping("utenti/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> deleteUtente(@PathVariable int id) {
		Optional<Utente> utenteObj = us.getById(id);
		
		ResponseEntity<Object> check = checkExists(utenteObj);
		if(check != null) return check;
		
		us.delete(utenteObj.get());
		
		return new ResponseEntity<>(
			String.format("L'Utente con id %d è stato eliminato!", id), HttpStatus.OK	
		);
	}
	
	//controllo SE esiste
	private ResponseEntity<Object> checkExists(Optional<Utente> obj) {
		if( !obj.isPresent() ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return null;
	}
}
