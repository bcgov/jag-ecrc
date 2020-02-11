package ca.bc.gov.open.ecrc;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;

/**
 * 
 * Interface for ECRC Service
 * 
 * @author shaunmillargov
 *
 */
public interface EcrcServices {
	
	public String doAuthenticateUser(String accessCode) throws EcrcServiceException;
	
	public String getProvinceList() throws EcrcServiceException;
	
	//TODO - fill in other service method signatures here. 
	
}

