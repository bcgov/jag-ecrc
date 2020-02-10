package ca.bc.gov.open.ecrc.util;

import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import ca.bc.gov.open.ecrc.objects.GetNextInvoiceId;
import ca.bc.gov.open.ecrc.utils.ObjectToJSONUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import javax.xml.bind.JAXBException;

public class ObjectToJSONUtilTest {
    @Test
    public void testFailedInputReturnsNull() {
        Assertions.assertNull(ObjectToJSONUtil.jaxbObjectToJSON(new DoAuthenticateUser()));
    }

    @Test
    public void testSuccess() {
        GetNextInvoiceId getNextInvoiceId = new GetNextInvoiceId();
        getNextInvoiceId.setInvoiceId(111);
        getNextInvoiceId.setMessage("TEST");
        getNextInvoiceId.setResponseCode(1);
        String result = ObjectToJSONUtil.jaxbObjectToJSON(getNextInvoiceId);

        Assertions.assertEquals("{\"\":\"\"}", result);
    }
}
