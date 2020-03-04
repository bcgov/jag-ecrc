package ca.bc.gov.open.ecrc.model;

public class ResponseBCSCClientDetails {
	private String primaryDocumentedSurname;
	private String primaryDocumentedGivenName;
	private String primaryDocumentedGivenNames;
	private String birthDate;
	private String sex;
	private String streetAddress;
	private String province;
	private String postalCode;
	private String country;
	
	public String getPrimaryDocumentedSurname() {
		return primaryDocumentedSurname;
	}
	
	public void setPrimaryDocumentedSurname(String primaryDocumentedSurname) {
		this.primaryDocumentedSurname = primaryDocumentedSurname;
	}
	
	public String getPrimaryDocumentedGivenName() {
		return primaryDocumentedGivenName;
	}
	
	public void setPrimaryDocumentedGivenName(String primaryDocumentedGivenName) {
		this.primaryDocumentedGivenName = primaryDocumentedGivenName;
	}

	public String getPrimaryDocumentedGivenNames() {
		return primaryDocumentedGivenNames;
	}

	public void setPrimaryDocumentedGivenNames(String primaryDocumentedGivenNames) {
		this.primaryDocumentedGivenNames = primaryDocumentedGivenNames;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
}
