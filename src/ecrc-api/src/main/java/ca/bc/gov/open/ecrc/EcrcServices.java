package ca.bc.gov.open.ecrc;

import java.util.ArrayList;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import ca.bc.gov.open.ecrc.model.Link;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;


/**
 *
 * Interface for ECRC Service
 *
 * @author shaunmillargov
 *
 */
public interface EcrcServices {

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber) throws EcrcServiceException, NotFoundException;

	public ArrayList<Link> getLinks() throws EcrcServiceException;

	public  ResponseEntity<String> getProvinceList() throws EcrcServiceException;

	public  ResponseEntity<String> getNextSessionId(String orgTicketNumber) throws EcrcServiceException;
	
	public  ResponseEntity<String> createApplicant(RequestCreateApplicant applicant) throws EcrcServiceException;

	public  ResponseEntity<String> createNewCRCService(RequestNewCRCService crcService) throws EcrcServiceException;

	//TODO - fill in other service method signatures here.

}
