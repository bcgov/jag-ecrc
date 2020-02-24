### ECRC Oauth2 API

Designed to work with the MitreID Oauth2 server (1.3.3) 
Second incarnation using nimbus oidc lib.

### Demonstrates:
- Creation and redirect of the client to the IDP for authorization (/idpRedirect)
- Authorization request to the server (with Authorization code and client secrets). 
- Capture of the access code returned from a successful authorization request
- Request of an access token with the access code.
- Request of a refresh token.   

### Configuration:
Set the following environmental variables before starting  
- OAUTH_IDP
- OAUTH_CLIENT_ID  
- OAUTH_CLIENT_SECRET
- OAUTH_FE_SECRET
- OAUTH_RETURN_URI
- OAUTH_SCOPE   
  
The two values above have to be configured based on the new user in the MitreID server: 

### User configuration on the server

    (main) 
        client_name: user_spa
        Redirect URI(s): http://localhost:8082/oauth/auth-callback

    (access) 
        scope: openid, profile, api1, online_access(required for refresh token)
        grant_type: authorization code
        response type: code

## Usage:

    mvn clean install (Once only)
    mvn package (Once only)
    mvn spring-boot:run

    Start a NEW browser window (Close all browsers and start a fresh instance)
    Navigate to http://localhost:8082/oauth/idpRedirect 
    You should be redirected to the Idp at this point for authentication. 
    Result should show a new access token.


See Usage.txt for detailed instructions on oidc Authentication flow. 

nimbus guide
https://connect2id.com/products/nimbus-oauth-openid-connect-sdk/guides


