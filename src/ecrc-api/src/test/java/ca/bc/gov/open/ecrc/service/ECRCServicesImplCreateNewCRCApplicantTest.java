package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestNewCRCApplicant;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import ca.bc.gov.open.ecrc.objects.*;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.ArgumentMatchers.any;

public class ECRCServicesImplCreateNewCRCApplicantTest {

    private static final String WEBMETHODSRES = "{\"message\":\"Success\",\"partyId\":49060,\"invoiceId\":49060,\"sessionId\":49060,\"serviceId\":49060,\"serviceFeeAmount\":28,\"responseCode\":0}";
    private static final String serviceResp =  "{\"paymentUrl\":\"test.com\",\"respMsg\":\"success\",\"respCode\":0}";
    private static final String successEmployeeResp = "{\"paymentUrl\":\"test.com\",\"serviceId\":\"49060\",\"partyId\":\"49060\",\"sessionId\":\"49060\",\"invoiceId\":\"49060\",\"serviceFeeAmount\":\"28.0\"}";
    private static final String successVolunteerResp = "{\"serviceId\":\"49060\",\"partyId\":\"49060\",\"sessionId\":\"49060\"}";
    private static final String successOnetimeResp = "{\"serviceId\":\"49060\",\"partyId\":\"49060\",\"sessionId\":\"49060\",\"invoiceId\":\"49060\"}";
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

    @Mock
    EcrcPaymentService ecrcPaymentService;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.openMocks(this);
        Mockito.when(ecrcProperties.getCreateApplicantUri()).thenReturn("/createApplicant");
        Mockito.when(ecrcProperties.getGetNextInvoiceIdUri()).thenReturn("invoiceurl?%s");
        Mockito.when(ecrcProperties.getGetNextSessionIdUri()).thenReturn("sessionurl?%s");
        Mockito.when(ecrcProperties.getCreateNewCRCServiceUri()).thenReturn("crcurl?%s");
        Mockito.when(ecrcProperties.getGetServiceFeeAmountUri()).thenReturn("feeurl?%s");
    }

    @DisplayName("Success Employee - ecrcService CreateNewCRCApplicant")
    @Test
    public void testEmployeeSuccess() throws EcrcServiceException {

        RequestNewCRCApplicant request = new RequestNewCRCApplicant();
        request.setApplType("EMPLOYEE");
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestNewCRCService(new RequestNewCRCService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

        Mockito.when(ecrcPaymentService.createPaymentUrl(any())).thenReturn(new ResponseEntity<>(serviceResp, HttpStatus.OK));
        ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
        Assert.assertEquals(successEmployeeResp, response.getBody());
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @DisplayName("Success Volunteer - ecrcService CreateNewCRCApplicant")
    @Test
    public void testVolunteerSuccess() throws EcrcServiceException {

        RequestNewCRCApplicant request = new RequestNewCRCApplicant();
        request.setApplType("VOLUNTEER");
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestNewCRCService(new RequestNewCRCService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

        Mockito.when(ecrcPaymentService.createPaymentUrl(any())).thenReturn(new ResponseEntity<>(serviceResp, HttpStatus.OK));
        ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
        Assert.assertEquals(successVolunteerResp, response.getBody());
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @DisplayName("Success Onetime - ecrcService CreateNewCRCApplicant")
    @Test
    public void testOnetimeSuccess() throws EcrcServiceException {

        RequestNewCRCApplicant request = new RequestNewCRCApplicant();
        request.setApplType("ONETIME");
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestNewCRCService(new RequestNewCRCService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

        Mockito.when(ecrcPaymentService.createPaymentUrl(any())).thenReturn(new ResponseEntity<>(serviceResp, HttpStatus.OK));
        ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
        Assert.assertEquals(successOnetimeResp, response.getBody());
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
    }

	@DisplayName("Error - CreateApplicant ecrcService CreateNewCRCApplicant")
	@Test
	public void testError1() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(CreateApplicant.class), any()))
				.thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
						HttpStatus.SERVICE_UNAVAILABLE));

		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
		Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
	}

	@DisplayName("Error - GetNextSessionId ecrcService CreateNewCRCApplicant")
	@Test
	public void testError2() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setApplType("EMPLOYEE");
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(CreateApplicant.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextSessionId.class), any()))
				.thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
						HttpStatus.SERVICE_UNAVAILABLE));

		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
		Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
	}

	@DisplayName("Error - GetServiceFeeAmount ecrcService CreateNewCRCApplicant")
	@Test
	public void testError3() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setApplType("EMPLOYEE");
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(CreateApplicant.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextSessionId.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextInvoiceId.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(CreateNewCRCService.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetServiceFeeAmount.class), any()))
				.thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
						HttpStatus.SERVICE_UNAVAILABLE));

		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
		Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
	}

	@DisplayName("Error - CreateNewCrcService ecrcService CreateNewCRCApplicant")
	@Test
	public void testError4() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setApplType("EMPLOYEE");
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(CreateApplicant.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextSessionId.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextInvoiceId.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(CreateNewCRCService.class), any()))
				.thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
						HttpStatus.SERVICE_UNAVAILABLE));

		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
		Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
	}

	@DisplayName("Error - GetNextInvoiceId ecrcService CreateNewCRCApplicant")
	@Test
	public void testError5() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setApplType("EMPLOYEE");
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(CreateApplicant.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextSessionId.class), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(GetNextInvoiceId.class), any()))
				.thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
						HttpStatus.SERVICE_UNAVAILABLE));

		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
		Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
	}
	
	@DisplayName("Error - createPaymentUrl ecrcService CreateNewCRCApplicant")
	@Test
	public void testError6() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setApplType("EMPLOYEE");
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

		Mockito.when(ecrcPaymentService.createPaymentUrl(any())).thenReturn(new ResponseEntity<>(
				"{\"message\":\"something happened\",responseCode\":-1}", HttpStatus.SERVICE_UNAVAILABLE));
		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
		Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
	}
	
	@DisplayName("Error - exception ecrcService CreateNewCRCApplicant")
	@Test
	public void testError7() throws EcrcServiceException {

		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		request.setApplType("EMPLOYEE");
		request.setRequestCreateApplicant(new RequestCreateApplicant());
		request.setRequestNewCRCService(new RequestNewCRCService());

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(), any()))
				.thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
				.thenThrow(new NullPointerException("error"));
		ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
		Assert.assertEquals("error", response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
