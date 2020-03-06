package ca.bc.gov.open.ecrc.util;

/**
*
* Ecrc Util class.
*
* @author sivakaruna
*
*/
public class EcrcUtil {
	private EcrcUtil() { throw new IllegalStateException("Utility class"); }

	public static final String SPACE = " ";
	public static final String ENCODED_SPACE = "%20";

	public static String encodeUriSpaces(String uri) {
		return uri.replace(SPACE, ENCODED_SPACE);
	}

}
