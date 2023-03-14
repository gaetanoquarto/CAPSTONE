package it.gaetanoquarto.app;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import it.gaetanoquarto.app.config.Beans;
import it.gaetanoquarto.app.entities.Campo;
import it.gaetanoquarto.app.entities.Ruolo;
import it.gaetanoquarto.app.entities.Utente;
import it.gaetanoquarto.app.entities.enums.TipoCampo;
import it.gaetanoquarto.app.entities.enums.TipoRuolo;
import it.gaetanoquarto.app.services.CampoService;
import it.gaetanoquarto.app.services.RuoloService;
import it.gaetanoquarto.app.services.UtenteService;

@SpringBootApplication
public class CapstoneBeApplication implements CommandLineRunner{

	ApplicationContext ctx = new AnnotationConfigApplicationContext(Beans.class);

	
	public static void main(String[] args) {
		SpringApplication.run(CapstoneBeApplication.class, args);
	}
	

	@Override
	public void run(String... args) throws Exception {
//		popolaDb();
		
		((AnnotationConfigApplicationContext)ctx).close();
	}
	
	@Autowired
	private UtenteService us;
	
	@Autowired
	private RuoloService rs;
	
	@Autowired CampoService cs;
	
	public void popolaDb() {
//		Ruolo r1 = (Ruolo)ctx.getBean("ruolo", TipoRuolo.ROLE_ADMIN);
//		Ruolo r2 = (Ruolo)ctx.getBean("ruolo", TipoRuolo.ROLE_USER);
//		Utente u1 = (Utente)ctx.getBean("utente", "admin", "admin@mail.com", "admin", "admin", "admin");
//				
//		rs.save(r1);
//		rs.save(r2);
//		
//		u1.setRuoli(new HashSet<>() {{
//			add(r1);
//		}});
//
//		us.save(u1);
//		
		
		Campo c1 = (Campo) ctx.getBean("campo", TipoCampo.CALCIOA5, 10);
		Campo c2 = (Campo) ctx.getBean("campo", TipoCampo.CALCIOA6, 12);
		Campo c3 = (Campo) ctx.getBean("campo", TipoCampo.CALCIOA7, 14);
		
		cs.save(c1);
		cs.save(c2);
		cs.save(c3);
		
		System.out.println("Db popolato!");
	}

}
