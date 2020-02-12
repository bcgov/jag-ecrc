package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GetNextSessionIdControllerTest {
    @InjectMocks
    GetNextSessionIdController getNextSessionIdController;

    @Mock
    EcrcServicesImpl ecrcServices;

    @Mock
    ObjectMapper objectMapper;

    @BeforeEach
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
    }

    @DisplayName("Error - getNextSession Not Implemented")
    @Test
    public void testFoundValidOrg() throws EcrcServiceException {
        ResponseEntity<String> result = getNextSessionIdController.getNextSessionId("SOMEDATA");
        Assertions.assertEquals(HttpStatus.NOT_IMPLEMENTED, result.getStatusCode());
    }
}
