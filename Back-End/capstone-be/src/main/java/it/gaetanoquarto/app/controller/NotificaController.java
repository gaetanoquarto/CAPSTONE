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

import it.gaetanoquarto.app.entities.Notifica;
import it.gaetanoquarto.app.services.NotificaService;

@RestController
@RequestMapping("/api/")
public class NotificaController {

	@Autowired
	private NotificaService ns;
	
	@GetMapping("notifiche")
	public ResponseEntity<List<Notifica>> getNotifiche() {
		List<Notifica> notifiche = ns.getAll();
		
		return new ResponseEntity<>(notifiche, HttpStatus.CREATED);
	}
	
	@GetMapping("notifiche/{id}")
	public ResponseEntity<Object> getNotificaById(@PathVariable int id) {
		Optional<Notifica> notificaObj = ns.getById(id);
		
		ResponseEntity<Object> check = checkExists(notificaObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(notificaObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("notifiche_page")
	public ResponseEntity<Object> getNotificheInPages(Pageable pageable) {
		Page<Notifica> notifiche = ns.getAll_page(pageable);
		
		if(notifiche.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(notifiche, HttpStatus.OK);
	}
	
	@PostMapping("notifiche")
	public ResponseEntity<Object> creaNotifica(@RequestBody Notifica n) {
		
		Notifica notifica = ns.save(n);
		
		return new ResponseEntity<Object>(notifica, HttpStatus.CREATED);
	}
	
	@DeleteMapping("notifiche/{id}")
	public ResponseEntity<Object> deleteNotifica(@PathVariable int id) {
		Optional<Notifica> notificaObj = ns.getById(id);
		
		ResponseEntity<Object> check = checkExists(notificaObj);
		if(check != null) return check;
		
		ns.delete(notificaObj.get());
		
		return new ResponseEntity<>(
			HttpStatus.OK	
		);
	}
	
	
	
	
	//controllo SE esiste
			private ResponseEntity<Object> checkExists(Optional<Notifica> obj) {
				if( !obj.isPresent() ) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				return null;
			}
}
