package ca.bc.gov.open.ecrc;

import java.util.ArrayList;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.Link;
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

	public String doAuthenticateUser(String orgTicketNumber) throws EcrcServiceException, NotFoundException;

	public ArrayList<Link> getLinks() throws EcrcServiceException;

	public String getProvinceList() throws EcrcServiceException;

	public String getNextSessionId(String orgTicketNumber) throws EcrcServiceException;

	//TODO - fill in other service method signatures here.

}