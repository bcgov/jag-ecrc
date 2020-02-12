package ca.bc.gov.open.ecrc;

import org.junit.Before;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
class EcrcApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
