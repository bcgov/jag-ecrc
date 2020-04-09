package ca.bc.gov.open.ecrc.model;

public class RequestNewCRCApplicant {
    private String requestGuid;
    private String approvedPage;
    private String declinedPage;
    private String errorPage;
    private String applType;
    private RequestCreateApplicant requestCreateApplicant;
    private RequestNewCRCService requestNewCRCService;

    public String getRequestGuid() { return requestGuid; }

    public void setRequestGuid(String requestGuid) { this.requestGuid = requestGuid; }

    public String getApprovedPage() { return approvedPage; }

    public void setApprovedPage(String approvedPage) { this.approvedPage = approvedPage;  }

    public String getDeclinedPage() { return declinedPage; }

    public void setDeclinedPage(String declinedPage) { this.declinedPage = declinedPage; }

    public String getErrorPage() { return errorPage; }

    public void setErrorPage(String errorPage) { this.errorPage = errorPage; }

    public String getApplType() { return applType; }

    public void setApplType(String applType) { this.applType = applType; }

    public RequestCreateApplicant getRequestCreateApplicant() {  return requestCreateApplicant; }

    public void setRequestCreateApplicant(RequestCreateApplicant requestCreateApplicant) { this.requestCreateApplicant = requestCreateApplicant; }

    public RequestNewCRCService getRequestNewCRCService() { return requestNewCRCService; }

    public void setRequestNewCRCService(RequestNewCRCService requestNewCRCService) { this.requestNewCRCService = requestNewCRCService;  }

}
