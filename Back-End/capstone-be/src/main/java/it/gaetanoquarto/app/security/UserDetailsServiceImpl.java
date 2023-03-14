package it.gaetanoquarto.app.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.gaetanoquarto.app.entities.Utente;
import it.gaetanoquarto.app.repositories.UtenteRepo;



@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	UtenteRepo userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Utente> user = userRepository.findByUsername(username);

		if (user.isPresent()) {
			return UserDetailsImpl.build(user.get());
		} else {
			throw new UsernameNotFoundException("Utente non trovato con l'username: " + username);
		}
	}

}