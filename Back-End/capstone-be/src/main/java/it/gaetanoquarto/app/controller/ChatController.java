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

import it.gaetanoquarto.app.entities.Chat;
import it.gaetanoquarto.app.services.ChatService;

@RestController
@RequestMapping("/api/")
public class ChatController {

	@Autowired
	private ChatService cs;
	
	@GetMapping("chat/{id}")
	public ResponseEntity<Object> getChatById(@PathVariable int id) {
		Optional<Chat> chatObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(chatObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(chatObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("chat")
	public ResponseEntity<Object> creaChat(@RequestBody Chat c) {
		
		Chat chat = cs.save(c);
		
		return new ResponseEntity<Object>(chat, HttpStatus.CREATED);
	}
	
	@DeleteMapping("chat/{id}")
	public ResponseEntity<Object> deleteChat(@PathVariable int id) {
		Optional<Chat> chatObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(chatObj);
		if(check != null) return check;
		
		cs.delete(chatObj.get());
		
		return new ResponseEntity<>(
			HttpStatus.OK	
		);
	}
	
	@PutMapping("chat/{id}")
	public ResponseEntity<Object> updateChat(@PathVariable int id, @RequestBody Chat _chat) {
		Optional<Chat> chatObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(chatObj);
		if(check != null) return check;
		
		Chat chat = chatObj.get();
		
		chat.setMessaggi(_chat.getMessaggi());
		cs.save(chat);
		
		return new ResponseEntity<Object>(chat, HttpStatus.CREATED);
	}
	
	
	
	//controllo SE esiste
		private ResponseEntity<Object> checkExists(Optional<Chat> obj) {
			if( !obj.isPresent() ) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return null;
		}
}
