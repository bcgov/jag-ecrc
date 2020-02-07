/**
 * 
 * EcrcServiceException class
 * 
 * Custom exception for ECRC RESTful operation suite. 
 * 
 * @author shaunmillargov
 *
 */
public class EcrcServiceException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5873442413088571528L;

	public EcrcServiceException(String message) {
		super(message);
	}

	public EcrcServiceException(String message, Throwable cause) {
		super(message, cause);
	}
}