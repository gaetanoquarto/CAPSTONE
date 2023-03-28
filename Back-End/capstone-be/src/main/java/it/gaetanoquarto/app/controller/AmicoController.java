package it.gaetanoquarto.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.Amico;
import it.gaetanoquarto.app.entities.CentroSportivo;
import it.gaetanoquarto.app.services.AmicoService;

@RestController
@RequestMapping("/api/")
public class AmicoController {
	
	@Autowired
	private AmicoService as;
	
	@GetMapping("amici")
	public ResponseEntity<List<Amico>> getAmici() {
		List<Amico> amici = as.getAll();
		
		return new ResponseEntity<>(amici, HttpStatus.CREATED);
	}
	
	@GetMapping("amici/{id}")
	public ResponseEntity<Object> getAmicoById(@PathVariable int id) {
		Optional<Amico> amicoObj = as.getById(id);
		
		ResponseEntity<Object> check = checkExists(amicoObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(amicoObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("amici")
	public ResponseEntity<Object> creaAmico(@RequestBody Amico a) {
		
		Amico amico = as.save(a);
		
		return new ResponseEntity<Object>(amico, HttpStatus.CREATED);
	}
	
	//controllo SE esiste
	private ResponseEntity<Object> checkExists(Optional<Amico> obj) {
		if( !obj.isPresent() ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return null;
	}

}
