package it.gaetanoquarto.app.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.gaetanoquarto.app.entities.Ruolo;
import it.gaetanoquarto.app.entities.Utente;
import it.gaetanoquarto.app.security.JwtUtils;
import it.gaetanoquarto.app.security.LoginRequest;
import it.gaetanoquarto.app.security.LoginResponse;
import it.gaetanoquarto.app.security.UserDetailsImpl;
import it.gaetanoquarto.app.services.RuoloService;
import it.gaetanoquarto.app.services.UtenteService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UtenteService us;
	
	@Autowired
	private RuoloService rs;
	
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	private PasswordEncoder pwEncoder;
		
	//gestisce la richiesta di login
	@PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		authentication.getAuthorities();
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new LoginResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles, userDetails.getExpirationTime()));
	}
	
	//crea un utente dalla registrazione
		@PostMapping("/registrazione")
		public ResponseEntity<Object> registrati(@RequestBody Utente u) {
			String password = u.getPassword();
			Optional<Ruolo> userOp = rs.getById(2);
			Ruolo user = userOp.get();
			u.setRuoli(new HashSet<>() {{
				add(user);
			}});
			u.setPassword(pwEncoder.encode(password));
			Utente utente = us.save(u);
			
			return new ResponseEntity<Object>(utente, HttpStatus.CREATED);
		}
		
		// Metodo per criptare la password dell'utente
		@GetMapping("/update_user_pw")
		@ResponseBody
		public String auth_update_user_pw() {
			int id = 1;
			
			Utente u = us.getById(id).get();
			String pw = u.getPassword();
			u.setPassword( pwEncoder.encode(pw) );
			us.save(u);
			
			return "utente aggiornato";
		}
	
	@GetMapping("/logout")
	public String logout() {
		return "utente disconnesso!";
	}

}
