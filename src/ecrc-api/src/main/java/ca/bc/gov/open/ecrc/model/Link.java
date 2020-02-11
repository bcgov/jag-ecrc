package ca.bc.gov.open.ecrc.model;

public class Link {
	
	private String name;
	private String url;
	
	public Link(String name, String url) {
		this.name = name;
		this.url = url;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String text) {
		this.name = text;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
