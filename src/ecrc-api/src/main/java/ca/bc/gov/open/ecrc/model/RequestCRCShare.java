package ca.bc.gov.open.ecrc.model;

public class RequestCRCShare {
    private RequestCreateApplicant requestCreateApplicant;
    private RequestCreateSharingService requestCreateSharingService;

    public RequestCreateApplicant getRequestCreateApplicant() {
        return requestCreateApplicant;
    }

    public void setRequestCreateApplicant(RequestCreateApplicant requestCreateApplicant) {
        this.requestCreateApplicant = requestCreateApplicant;
    }

    public RequestCreateSharingService getRequestCreateSharingService() {
        return requestCreateSharingService;
    }

    public void setRequestCreateSharingService(RequestCreateSharingService requestCreateSharingService) {
        this.requestCreateSharingService = requestCreateSharingService;
    }
}
