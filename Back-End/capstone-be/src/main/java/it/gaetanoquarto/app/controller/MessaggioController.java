package it.gaetanoquarto.app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.Messaggio;
import it.gaetanoquarto.app.services.MessaggioService;

@RestController
@RequestMapping("/api/")
public class MessaggioController {

	@Autowired
	private MessaggioService ms;
	
	@GetMapping("messaggi/{id}")
	public ResponseEntity<Object> getMessaggioById(@PathVariable int id) {
		Optional<Messaggio> messaggioObj = ms.getById(id);
		
		ResponseEntity<Object> check = checkExists(messaggioObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(messaggioObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("messaggi")
	public ResponseEntity<Object> creaMessaggio(@RequestBody Messaggio m) {
		
		Messaggio messaggio = ms.save(m);
		
		return new ResponseEntity<Object>(messaggio, HttpStatus.CREATED);
	}
	
	@DeleteMapping("messaggi/{id}")
	public ResponseEntity<Object> deleteMessaggio(@PathVariable int id) {
		Optional<Messaggio> messaggioObj = ms.getById(id);
		
		ResponseEntity<Object> check = checkExists(messaggioObj);
		if(check != null) return check;
		
		ms.delete(messaggioObj.get());
		
		return new ResponseEntity<>(
			HttpStatus.OK	
		);
	}
	
	@PutMapping("messaggi/{id}")
	public ResponseEntity<Object> updateChat(@PathVariable int id, @RequestBody Messaggio _messaggio) {
		Optional<Messaggio> messaggioObj = ms.getById(id);
		
		ResponseEntity<Object> check = checkExists(messaggioObj);
		if(check != null) return check;
		
		Messaggio messaggio = messaggioObj.get();
		
		messaggio.setMessaggio(_messaggio.getMessaggio());
		messaggio.setData(_messaggio.getData());
		messaggio.setOra(_messaggio.getOra());
		ms.save(messaggio);
		
		return new ResponseEntity<Object>(messaggio, HttpStatus.CREATED);
	}
	
	
	
	//controllo SE esiste
		private ResponseEntity<Object> checkExists(Optional<Messaggio> obj) {
			if( !obj.isPresent() ) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return null;
		}
}
