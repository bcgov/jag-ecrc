package ca.bc.gov.open.ecrc;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import javassist.NotFoundException;

/**
 * 
 * Interface for ECRC Service
 * 
 * @author shaunmillargov
 *
 */
public interface EcrcServices {
	
	public String doAuthenticateUser(String accessCode) throws EcrcServiceException, NotFoundException;
	
	public String getProvinceList() throws EcrcServiceException;
	
	//TODO - fill in other service method signatures here. 
	
}

