package ca.bc.gov.open.ecrc.exception;

/**
 * @author sivakaruna
 *
 */
public final class EcrcExceptionConstants {
	
	public static final int WEBSERVICE_STATUS_CODE_SUCCESS = 0;

	public static final String WEBSERVICE_ERROR_JSON_RESPONSE = "{\"message\":\"%s\", \"responseCode\":1}";

	public static final String CONVERT_TO_JSON_ERROR = "Could not convert to JSON object";

	public static final String WEBSERVICE_RESPONSE_ERROR = "Could not connect to web service";
	
	public static final String DATA_NOT_FOUND_ERROR = "Requested data not found";

}
