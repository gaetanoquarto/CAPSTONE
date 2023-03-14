package it.gaetanoquarto.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.CentroSportivo;
import it.gaetanoquarto.app.entities.Partita;
import it.gaetanoquarto.app.services.CentroSportivoService;

@RestController
@RequestMapping("/api/")
public class CentroSportivoController {
	
	@Autowired
	private CentroSportivoService css;
	
	@GetMapping("centri-sportivi")
	public ResponseEntity<List<CentroSportivo>> getCentriSportivi() {
		List<CentroSportivo> centriSportivi = css.getAll();
		
		return new ResponseEntity<>(centriSportivi, HttpStatus.CREATED);
	}
	
	@GetMapping("centri-sportivi/{id}")
	public ResponseEntity<Object> getCentroSportivoById(@PathVariable int id) {
		Optional<CentroSportivo> centroSportivoObj = css.getById(id);
		
		ResponseEntity<Object> check = checkExists(centroSportivoObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(centroSportivoObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("centri-sportivi_page")
	public ResponseEntity<Object> getCentriSportiviInPages(Pageable pageable) {
		Page<CentroSportivo> centriSportivi = css.getAll_page(pageable);
		
		if(centriSportivi.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(centriSportivi, HttpStatus.OK);
	}
	
	@PostMapping("centri-sportivi")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> creaCentroSportivo(@RequestBody CentroSportivo cs) {
		
		CentroSportivo centroSportivo = css.save(cs);
		
		return new ResponseEntity<Object>(centroSportivo, HttpStatus.CREATED);
	}
	
	@PutMapping("centri-sportivi/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> updateCentroSportivo(@PathVariable int id, @RequestBody CentroSportivo _centroSportivo) {
		Optional<CentroSportivo> centroSportivoObj = css.getById(id);
		
		ResponseEntity<Object> check = checkExists(centroSportivoObj);
		if(check != null) return check;
		
		CentroSportivo centroSportivo = centroSportivoObj.get();
		
		centroSportivo.setNomeCentroSportivo(_centroSportivo.getNomeCentroSportivo());
		centroSportivo.setCittàCentroSportivo(_centroSportivo.getCittàCentroSportivo());		
		css.save(centroSportivo);
		
		return new ResponseEntity<Object>(centroSportivoObj, HttpStatus.CREATED);
	}
	
	@DeleteMapping("centri-sportivi/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> deleteCentroSportivo(@PathVariable int id) {
		Optional<CentroSportivo> centroSportivoObj = css.getById(id);
		
		ResponseEntity<Object> check = checkExists(centroSportivoObj);
		if(check != null) return check;
		
		css.delete(centroSportivoObj.get());
		
		return new ResponseEntity<>(
			String.format("Il centro sportivo con id %d è stata eliminato!", id), HttpStatus.OK	
		);
	}
	

	//controllo SE esiste
			private ResponseEntity<Object> checkExists(Optional<CentroSportivo> obj) {
				if( !obj.isPresent() ) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				return null;
			}
}
