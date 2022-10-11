package ca.bc.gov.open.ecrc.util;

import java.io.UnsupportedEncodingException;

import java.net.URLEncoder;

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

	public static String encodeData(String value) {

		if (value == null) {
			return "";
		}

		try {
			return URLEncoder.encode(value , "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}

	}

}
