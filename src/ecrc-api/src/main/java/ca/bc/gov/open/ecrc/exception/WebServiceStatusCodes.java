package ca.bc.gov.open.ecrc.exception;

public enum WebServiceStatusCodes {
    SUCCESS(0),
    NOTFOUND(1),
    ERROR(-1);

    private final int errorCode;

    WebServiceStatusCodes(int errorCode) {
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}
