package ca.bc.gov.open.ecrc.security;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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
import ca.bc.gov.open.ecrc.model.ValidationResponse;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;

import static org.mockito.ArgumentMatchers.any;

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
	private final String jwtPerSuccess = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6WyJyb2xlIl0sInBlciI6ImVlVEFNTHZ0LytBeGoweEt1V2dycWZMd3ZwK1VacXZ"
			+ "IajJuUVpiOTFvWEZZRVVTT3djMXpFSDJwVHRzY1U1Q2VrVzNsYXMvN2UzVFhjUVU1ZnZVNzdFNFhDRXF2OFZvcjUyTm9wR1hRclcwVkF"
			+ "lMFUvYW85czg5ZzZoemk0RnJXRmREUXNSWFIrSlNNTFdGMytkVUhiUGhkZkFmY05razR3YllKNTRFTHRnSjE2TkJOaVVQRS9XaUg5dU11"
			+ "Vzk2L3dobm5TaEIwNjM4ekYvdzFPWVUvWklkVHZ2SjQxVHR1b2J6N25oTmtkWWVyQnkvenorMi9qWXRzN2x4QnJPRGo1VjY5L2tnNFJhVm5"
			+ "UYmwwendINUVVdTJxMUxOWW5ia3MxeVRrNFhPUUNRSzA5QXN4NE13NnJNb1FXRmNzS2dVek1GbUVDeEhCaUJpbWFMaVY2VkpHZndHRjU3Lzdy"
			+ "dXV1YnBSUzhnVFNtUVl5bnB3M1R4RkdWTU5rdnlENHljMkM5T1VBNVdpQy9hOFplNEdRN203TkZ5UnhzMUZjNTRXY25CNlJzT3lHZnErMURJWW"
			+ "9ES1BlQkwybUdMQ0RZY0MzYVFlcEtraENsbHowV09lU2pyVmZjaGI1VHJVRHpLSENFZ0ZWMkU1SzExQ1ozcXZ0SDF5RFRFRnFPM3RVVnBpWmJT"
			+ "RU9BQ2dDWjRRTnRwWTJjT0pMVXBBR3ZtbU9CbU93YjN5RHdtaVpaZytOQmdjVEhMUmFsSTRyNEZwVGlOTjZCOElVZUhRdEd0cG0xK1RjOS90L3"
			+ "NEb2FFa3RHN081Tmp5bXVReUY5OG1EK0YwWFBIRUpxN1pIVlVDbDE2ZW5NNEZMS0JxNlpwS1BTLzcrNFZkNXZvSEVPWkM4azFSREVha3MzVnZ5c"
			+ "UptQ0I2QTM5TUREeVUvNVk5NGc1NlNkTmpYOVZtUGd1UWRZTEd0eXMvQU5od3pIZjNUSWZTbllNQjhNQy81YmNOZ2lDa3BYdURyVWI4ZGhCUGVBY"
			+ "np0RXJnUWlLSVdBOTJtdzRMclBIbkNwRHhXU3dUZjBMcFE2bmVhVHlIQ2FOL1k9In0.NLKnS4tVeehLPGBu01aVB3b93zeYgj_H9HPPTM_75yg";
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
		Mockito.when(ecrcProperties.getJwtSecret()).thenReturn("secret");
		Mockito.when(ecrcProperties.getOauthPERSecret()).thenReturn("secret");
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
		ValidationResponse responseBean = new ValidationResponse();
		responseBean.setValid(true);
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
		ValidationResponse responseBean = new ValidationResponse();
		responseBean.setValid(false);
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
