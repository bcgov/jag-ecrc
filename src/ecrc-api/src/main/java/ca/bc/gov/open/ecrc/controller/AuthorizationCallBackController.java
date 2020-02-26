package ca.bc.gov.open.ecrc.controller;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;

@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
@RestController
/** 
 * 
 * mimics the callback URL contained within the front end SPA. 
 * 
 * This class IS NOT required for the final solution. It's only required for testing purposes when NO front end is available.  
 * 
 * @author shaunmillargov
 *
 */
public class AuthorizationCallBackController {
	
	@Autowired
	private EcrcProperties ecrcProps;
	
	private String LOGIN_ENDPOINT; 
	
	@PostConstruct
	public void InitService() {
		this.LOGIN_ENDPOINT = "http://localhost:" + ecrcProps.getServerPort() + "/ecrc/login";
	}
	
	
	@RequestMapping(value = "/auth-callback", 
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> callback(@RequestHeader Map<String,String> _headers, @RequestParam MultiValueMap<String, String> parameters) {
		
		System.out.println("reached callback...");
		
		// list headers
		_headers.forEach((key,value) ->{
            System.out.println("Header Name: "+key+" Header Value: "+value);
        });
		
		//list params coming back from initial /authorize call. 
		for (Entry<String, List<String>> entry : parameters.entrySet())  
            System.out.println("Key = " + entry.getKey() + 
                             ", Value = " + entry.getValue()); 
		
		// capture auth code from params and use it to generate a token request/ 
		System.out.println("Using Auth Code of " + parameters.getFirst("code") + " to request new token");
		
		System.out.println("requesting new access token...");
		
		// set up params for POST to /token endpoint 
	    MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
	    params.add("code", parameters.getFirst("code"));
		
		// do post 
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	    
	    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(params, headers);
	    RestTemplate restTemplate = new RestTemplate();
	    ResponseEntity<String> response = restTemplate.postForEntity( LOGIN_ENDPOINT , request , String.class );
	    
	    return response; 
	
	    
//	    ObjectMapper mapper = new ObjectMapper();
//	    
//		// pretty print
//		String json = null;
//		try {
//			json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(response.getBody());
//		} catch (JsonProcessingException e) {
//			e.printStackTrace();
//		}
	    
	    // spit out the token (pretty format).
		//return json;
	}
}