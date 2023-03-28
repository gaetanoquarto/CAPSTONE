package it.gaetanoquarto.app.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.Campo;
import it.gaetanoquarto.app.entities.Partita;
import it.gaetanoquarto.app.services.CampoService;

@RestController
@RequestMapping("/api/")
public class CampoController {
	
	@Autowired
	private CampoService cs;
	
	@GetMapping("campi")
	public ResponseEntity<List<Campo>> getCampi() {
		List<Campo> campi = cs.getAll();
		
		return new ResponseEntity<>(campi, HttpStatus.CREATED);
	}
	
	@GetMapping("campi/{id}")
	public ResponseEntity<Object> getCampoById(@PathVariable int id) {
		Optional<Campo> campoObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(campoObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(campoObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("campi_page")
	public ResponseEntity<Object> getCampiInPages(Pageable pageable) {
		Page<Campo> campi = cs.getAll_page(pageable);
		
		if(campi.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(campi, HttpStatus.OK);
	}
	
	
	@PostMapping("campi")
	public ResponseEntity<Object> creaCampo(@RequestBody Campo c) {
		
		Campo campo = cs.save(c);
		
		return new ResponseEntity<Object>(campo, HttpStatus.CREATED);
	}
	
	@DeleteMapping("campi/{id}")
	public ResponseEntity<Object> deleteCampo(@PathVariable int id) {
		Optional<Campo> campoObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(campoObj);
		if(check != null) return check;
		
		cs.delete(campoObj.get());
		
		return new ResponseEntity<>(
			HttpStatus.OK	
		);
	}
	
	
	//controllo SE esiste
			private ResponseEntity<Object> checkExists(Optional<Campo> obj) {
				if( !obj.isPresent() ) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				return null;
			}

}
