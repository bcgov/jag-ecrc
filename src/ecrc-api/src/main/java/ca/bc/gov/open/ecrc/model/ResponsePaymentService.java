package ca.bc.gov.open.ecrc.model;

import javax.xml.bind.annotation.*;

/**
 * Response object for payment
 * 
 * @author sivakaruna
 *
 */

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "respMsg", "respCode", "respValue" })
@XmlRootElement(name = "singlePaymentResponse")
public class ResponsePaymentService {

	@XmlElement(name = "respMsg")
	private String respMsg;

	@XmlElement(name = "respCode")
	private int respCode;

	@XmlElement(name = "respValue")
	private String respValue;

	public String getRespMsg() {
		return respMsg;
	}

	public void setRespMsg(String respMsg) {
		this.respMsg = respMsg;
	}

	public int getRespCode() {
		return respCode;
	}

	public void setRespCode(int respCode) {
		this.respCode = respCode;
	}

	public String getRespValue() {
		return respValue;
	}

	public void setRespValue(String respValue) {
		this.respValue = respValue;
	}

}
