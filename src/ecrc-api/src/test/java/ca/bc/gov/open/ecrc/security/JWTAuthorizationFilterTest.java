package ca.bc.gov.open.ecrc.security;

import static org.mockito.Mockito.mock;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.context.SecurityContextHolder;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;

/**
 * Tests for jwt authorization filter
 * 
 * @author sivakaruna
 *
 */
class JWTAuthorizationFilterTest {

	private final String jwtSuccess = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6WyJyb2xlIl19."
			+ "hRTr1-4SQQDyru3SQp1DHbLLJnb3UQqyg_v-PgDEd5Y";
	private final String jwtRunTimeError = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6InJvbGUifQ." + "Xyh5YRGNLdaPfxCUak6dokgoWb9EA51w9LslqcndWjU";
	private final String jwtSignError = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgifQ.wAiFql12MJHfbQEl10q-5PlIgBCKprhR-PAUpec5XNo";
	private final String jwtNoAuthError = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgifQ._jAQhm5cSueXMqM_J-3tILs2gXgYG-0bB2-v1h_ETHY";

	@InjectMocks
	JWTAuthorizationFilter filter;

	@Mock
	EcrcProperties ecrcProperties;

	@BeforeEach
	void initialize() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getJwtHeader()).thenReturn("header");
		Mockito.when(ecrcProperties.getJwtPrefix()).thenReturn("prefix");
		Mockito.when(ecrcProperties.getJwtSecret()).thenReturn("secret");
	}

	@DisplayName("Success - doFilterInternal jwt filter")
	@Test
	void testSuccess() throws ServletException, IOException {
		// Valid JWT
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {
			@Override
			public String getHeader(String name) {
				return "prefix" + jwtSuccess;
			}
		};
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(wrapper, response, chain);
		Assertions.assertTrue(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
	}

	@DisplayName("Missing Header - doFilterInternal jwt filter")
	@Test
	void testMissingHeader() throws ServletException, IOException {
		// Missing header
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(request, response, chain);
		Assertions.assertNull(SecurityContextHolder.getContext().getAuthentication());
	}

	@DisplayName("Missing Authority - doFilterInternal jwt filter")
	@Test
	void testMissingAuthority() throws ServletException, IOException {
		// No Authority provided
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {

			@Override
			public String getHeader(String name) {
				return "prefix" + jwtNoAuthError;
			}
		};
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(wrapper, response, chain);
		Assertions.assertNull(SecurityContextHolder.getContext().getAuthentication());
	}

	@DisplayName("Invalid Signature - doFilterInternal jwt filter")
	@Test
	void testInvalidSignature() throws ServletException, IOException {
		// Invalid signature
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {

			@Override
			public String getHeader(String name) {
				return "prefix" + jwtSignError;
			}
		};
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(wrapper, response, chain);
		Assertions.assertNull(SecurityContextHolder.getContext().getAuthentication());
	}

	@DisplayName("Error - doFilterInternal jwt filter")
	@Test
	void testError() throws ServletException, IOException {
		// Authority list malformed
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {

			@Override
			public String getHeader(String name) {
				return "prefix" + jwtRunTimeError;
			}
		};
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(wrapper, response, chain);
		Assertions.assertNull(SecurityContextHolder.getContext().getAuthentication());
	}

}
