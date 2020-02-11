package ca.bc.gov.open.ecrc;

import java.util.ArrayList;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.Link;

/**
 * 
 * Interface for ECRC Service
 * 
 * @author shaunmillargov
 *
 */
public interface EcrcServices {
	
	public String doAuthenticateUser(String accessCode) throws EcrcServiceException;
	
	public ArrayList<Link> getLinks() throws EcrcServiceException;
	
	public String getProvinceList() throws EcrcServiceException;
	
	//TODO - fill in other service method signatures here. 
	
}

