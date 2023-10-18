package ca.bc.gov.open.ecrc.security;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.model.ValidationResponse;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * Tests for jwt authorization filter
 * 
 * @author sivakaruna
 *
 */
class JWTAuthorizationFilterTest {
	private final String jwtSuccess = "eyJhbGciOiJIUzI1NiJ9."
		+"eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6WyJyb2xlIl19."
		+"VcQJjwPagd49D7v9YLKdM1FGc5DtsJeUzeDeG6IjKSs";
	private final String jwtPerSuccess = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6WyJyb2xlIl0sInBlciI6Ikw3anYzK3g0VHJFb3lUVkdGS3pCR1c5VldzY3pLNlI2am"
			+ "1VLzJUdDB3ck1Iekk5VWJ3Kzk1SlZ4TVdXc291TTNrZ2xBd3FTSC8vTXErcEJlMVUrNzNJejhwS2E5Q3haVXlEL3BTeEN4dUNTcGFoeU1wek9V"
			+ "VjNQUVFiaFlhSUdYeFNsK3E1ajEzemcyaExzNGRQT3FEZFlrTEtrYk5EWEQzNnJ4eGVTbTV5U29xeWZMUG45cEV6MitEWHVwNzIyd2FqNzcrNk"
			+ "Z0djNUN040NVVUeTlIeHhzSm81aHNnbUpYREhpd3VNTFpTOGF4Rm1GdFhQZVRMK1o3MHJmczl3QUZDU1ZESXpmTzllU09IR0xzUVFRUmtYL2Fk"
			+ "R2d5MVcxY25UQ2Z3ZVFLMkZQU3lvb2pvUisvUTROblIyKytmNmh4V3JhWm5SV1Z4L2VOYU9uYUdub1c5c1p5M2Fkd09VcU5HOFNDZ1JyZG1TNX"
			+ "AzWHhPQlltU1o0RUlXMGR5TVNGQWphMy9KeS90d2xHYm9hVW43QjVmUnlTZUc0dnJncjAwaXBwQThnRjJUdDVLakZXcHRlRit1Z1ZPZTQ1bktJ"
			+ "bHY4RVFjZlk4UHd3R2o5aTZzbkpKb3VJSGc0ZWRaSmh4YTFac1BXVStJWHFGSTc3OUFKOWY0QnU1bjVXbm9NVlBHbmdZSUFiS1E0Uk9rdjJLd1"
			+ "BaTWVZUmtLalBmeW44Y2RIckczREpDOVFkWFhXUkVna3JjOXNTVVEzWWZ0S2VVaHdNKy9QdlNIUDRXZVhSWnNLL2llQnVpU1FYemNHVzhGRzVB"
			+ "MEFKU0M3WWExV3FVdDFGSVIzR3BYNEo4c05DWWJSblY0QTc3UHpxeExzdWcyaEhDUCsrVE1zVCs3U1NzN0FmUXNmZ01LM3ZFYjlvblY1bU4zSn"
			+ "BZMUJnS2ZtUDFHRFdJNUp2U2xkdWhXWTVxQVYwa0k1YkV3VHlUUmpOaVVrWlprdER4bGdkNEdzYkF2RW9WN1czcCtVTFE0bGhwM3BmSkprcW1D"
			+ "YUJaRjNiSTFnVWc0VDlDTDJkYkJpbjJkblJHN0ZYY3pyR0U9In0."
			+ "0J6Q1uh3y-xT5edpU-vyi3Orl9lkLtcdMzZH05OP4HQ";
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

	@Mock
	ECRCJWTValidationServiceImpl tokenValidationServices;

	@BeforeEach
	void initialize() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getJwtHeader()).thenReturn("header");
		Mockito.when(ecrcProperties.getJwtPrefix()).thenReturn("prefix");
		Mockito.when(ecrcProperties.getJwtSecret()).thenReturn("this-is-very-long-256-bit-secret");
		Mockito.when(ecrcProperties.getOauthPERSecret()).thenReturn("this-is-very-long-256-bit-secret");
	}

	@DisplayName("Success - doFilterInternal jwt filter")
	@Test
	void testSuccess() throws ServletException, IOException {
		SecurityContextHolder.clearContext();
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

	@DisplayName("Success - doFilterInternal jwt filter (private urls)")
	@Test
	void testSuccess2() throws ServletException, IOException {
		SecurityContextHolder.clearContext();
		// Authority list malformed
		ValidationResponse responseBean = new ValidationResponse(true, "message");
		when(tokenValidationServices.validateBCSCAccessToken(any())).thenReturn(responseBean);
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {

			@Override
			public String getHeader(String name) {
				return "prefix" + jwtPerSuccess;
			}

			@Override
			public String getServletPath() {
				return "/private/login";
			}

		};
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(wrapper, response, chain);
		Assertions.assertTrue(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
	}

	@DisplayName("Error - doFilterInternal jwt filter (private urls)")
	@Test
	void testMissingValidPerToken() throws ServletException, IOException {
		SecurityContextHolder.clearContext();
		// Authority list malformed
		ValidationResponse responseBean = new ValidationResponse(false, "message");
		when(tokenValidationServices.validateBCSCAccessToken(any())).thenReturn(responseBean);
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {

			@Override
			public String getHeader(String name) {
				return "prefix" + jwtPerSuccess;
			}

			@Override
			public String getServletPath() {
				return "/private/login";
			}

		};
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain chain = mock(FilterChain.class);
		filter.doFilterInternal(wrapper, response, chain);
		Assertions.assertNull(SecurityContextHolder.getContext().getAuthentication());
	}

	@DisplayName("Missing Header - doFilterInternal jwt filter")
	@Test
	void testMissingHeader() throws ServletException, IOException {
		SecurityContextHolder.clearContext();
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
		SecurityContextHolder.clearContext();
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
		SecurityContextHolder.clearContext();
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
		SecurityContextHolder.clearContext();
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
