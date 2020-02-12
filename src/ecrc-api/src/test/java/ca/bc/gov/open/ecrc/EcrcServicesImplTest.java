package ca.bc.gov.open.ecrc;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;


public class EcrcServicesImplTest {
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    WebClient webClient;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testDoAuthenticateResult() {
        
    }
}
