package ca.bc.gov.open.ecrc;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class EcrcServicesImplTest {
    EcrcServicesImpl ecrcServices = new EcrcServicesImpl();
    @Test
    public void testResult() {
        DoAuthenticateUser authedUser;
        try {
            authedUser = ecrcServices.doAuthenticateUser("TEST");
        } catch (EcrcServiceException e) {
            authedUser = null;
        }
        //Currently a simple test as this will only return mocked data.
        Assertions.assertEquals(1, authedUser.getResponseCode());
    }
}
