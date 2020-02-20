package ca.bc.gov.open.ecrc.exception;

/**
 * @author sivakaruna
 *
 */
public final class EcrcExceptionConstants {

	public static final String WEBSERVICE_ERROR_JSON_RESPONSE = "{\"message\":\"%s\", \"responseCode\":%d}";

	public static final String CONVERT_TO_JSON_ERROR = "Could not convert to JSON object";

	public static final String WEBSERVICE_RESPONSE_ERROR = "Error connecting to service";
	
	public static final String DATA_NOT_FOUND_ERROR = "Requested data not found";

	public static final String UNKNOWN_RESPONSE_CODE = "Unknown response code return";

	public static final String SERVICE_UNAVAILABLE = "Service unavailable returned";

}
