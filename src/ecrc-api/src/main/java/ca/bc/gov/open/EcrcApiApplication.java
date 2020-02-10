package ca.bc.gov.open;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("ecrc-rest.properties")
public class EcrcApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcrcApiApplication.class, args);
	}

}
