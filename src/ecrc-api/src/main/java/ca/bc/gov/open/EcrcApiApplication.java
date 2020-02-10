package ca.bc.gov.open;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcrcApiApplication {

	public static void main(String[] args) {
		//System.setProperty("javax.xml.bind.context.factory","org.eclipse.persistence.jaxb.JAXBContextFactory");
		SpringApplication.run(EcrcApiApplication.class, args);
	}

}
