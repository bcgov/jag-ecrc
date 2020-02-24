package ca.bc.gov.open.ecrc.oauth.api.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"access_token",
"token_type",
"refresh_token",
"scope",
"id_token"
})
public class AccessToken {

@JsonProperty("access_token")
private String accessToken;
@JsonProperty("token_type")
private String tokenType;
@JsonProperty("refresh_token")
private String refreshToken;
@JsonProperty("scope")
private String scope;
@JsonProperty("id_token")
private String idToken;

@JsonProperty("access_token")
public String getAccessToken() {
return accessToken;
}

@JsonProperty("access_token")
public void setAccessToken(String accessToken) {
this.accessToken = accessToken;
}

@JsonProperty("token_type")
public String getTokenType() {
return tokenType;
}

@JsonProperty("token_type")
public void setTokenType(String tokenType) {
this.tokenType = tokenType;
}

@JsonProperty("refresh_token")
public String getRefreshToken() {
return refreshToken;
}

@JsonProperty("refresh_token")
public void setRefreshToken(String refreshToken) {
this.refreshToken = refreshToken;
}

@JsonProperty("scope")
public String getScope() {
return scope;
}

@JsonProperty("scope")
public void setScope(String scope) {
this.scope = scope;
}

@JsonProperty("id_token")
public String getIdToken() {
return idToken;
}

@JsonProperty("id_token")
public void setIdToken(String idToken) {
this.idToken = idToken;
}

}