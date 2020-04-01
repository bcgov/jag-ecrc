package ca.bc.gov.open.ecrc.configuration;

import org.junit.Assert;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class EcrcPropertiesTest {

	@Autowired
	EcrcProperties ecrcProperties;

	@DisplayName("Success - ecrcProperties loaded")
	@Test
	void test() {

		Assert.assertEquals("testUrl", ecrcProperties.getBaseUrl());
		Assert.assertEquals("origins", ecrcProperties.getCorsAllowedOrigins());
		Assert.assertEquals("mapping", ecrcProperties.getCorsMapping());
		Assert.assertEquals("createApplicantUri", ecrcProperties.getCreateApplicantUri());
		Assert.assertEquals("createNewCRCService", ecrcProperties.getCreateNewCRCServiceUri());
		Assert.assertEquals("doAuthenticateUser", ecrcProperties.getDoAuthenticateUserUri());
		Assert.assertEquals("getNextInvoiceId", ecrcProperties.getGetNextInvoiceIdUri());
		Assert.assertEquals("getNextSessionId", ecrcProperties.getGetNextSessionIdUri());
		Assert.assertEquals("getProvinceList", ecrcProperties.getGetProvincesListUri());
		Assert.assertEquals("getServiceFeeAmount", ecrcProperties.getGetServiceFeeAmountUri());
		Assert.assertEquals("logPaymentFailure", ecrcProperties.getLogPaymentFailureUri());
		Assert.assertEquals("password", ecrcProperties.getPassword());
		Assert.assertEquals("updateServiceFinancialTxn", ecrcProperties.getUpdateServiceFinancialTxnUri());
		Assert.assertEquals("usename", ecrcProperties.getUsername());
		Assert.assertEquals("abc", ecrcProperties.getWhiteList().get(0));
		Assert.assertEquals("https://test1.ca", ecrcProperties.getLinks().get("test1"));
		Assert.assertEquals("header", ecrcProperties.getJwtHeader());
		Assert.assertEquals("prefix", ecrcProperties.getJwtPrefix());
		Assert.assertEquals("secret", ecrcProperties.getJwtSecret());
		Assert.assertEquals("role", ecrcProperties.getJwtRole());
		Assert.assertEquals("/getSinglePaymentURL", ecrcProperties.getGetSinglePaymentUri());
		Assert.assertEquals("bcsc", ecrcProperties.getOauthIdp());
		Assert.assertEquals("1234", ecrcProperties.getOauthClientId());
		Assert.assertEquals("5678", ecrcProperties.getOauthSecret());
		Assert.assertEquals("api", ecrcProperties.getOauthScope());
		Assert.assertEquals("returnuri", ecrcProperties.getOauthReturnUri());
		Assert.assertEquals("wellknown", ecrcProperties.getOauthWellKnown());
		
		Assert.assertEquals(3000, ecrcProperties.getOauthJwtExpiry());
		Assert.assertEquals(60000, ecrcProperties.getOauthBCSCTimeout());
	}

}
