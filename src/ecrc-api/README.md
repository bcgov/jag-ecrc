# ecrc-api

This application provides the eCRC API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Possibly STS4 (Used to create this initial code base).

Note: Clone the repo then import as a 'Maven' project into STS4.

### Environmental variables for running the eCRC-API locally

The following Windows environmental variables must be set either as Windows environmental variables or as STS4 Spring Boot App variables.

| Variable                  |                Example Value |
| ------------------------- | ---------------------------: |
| ECRC_BASEURL              |        http:8000//myendpoint |
| ECRC_USERNAME             |                         user |
| ECRC_PASSWORD             |                     password |
| ECRC_WHITELIST            |                         test |
| ECRC_SERVER_PORT          |                         8080 |
| ECRC_CORS_MAPPING         |                       //\*\* |
| ECRC_CORS_ALLOWED_ORIGINS |                    http:3000 |
| ECRC_JWT_HEADER           |                Authorization |
| ECRC_JWT_PREFIX           |                       Bearer |
| ECRC_JWT_SECRET           |              SOMETHINGSECRET |
| ECRC_JWT_ROLE             |                     someRole |
| ECRC_OAUTH_IDP            |                      IDP url |
| ECRC_OAUTH_CLIENT_ID      |              oAuth Client ID |
| ECRC_OAUTH_SECRET         |                 oAuth secret |
| ECRC_OAUTH_SCOPE          |       scope for oAuth return |
| ECRC_OAUTH_RETURN_URI     |        http:8000//myendpoint |
| ECRC_PAYMENT_URL          |          Payment service url |
| ECRC_PAYMENT_USERNAME     |                         user |
| ECRC_PAYMENT_PASSWORD     |                     password |
| ECRC_OAUTH_TOKEN_EXPIRY   | expiry time of token in mils |
| ECRC_JWT_AUTH_ROLE        |         role for authed user |
| ECRC_OAUTH_WELL_KNOWN     |             oAuth well known |
| ECRC_OAUTH_PER_SECRET     |                   per secret |

### Installing

```
mvn clean install
```

## Run locally (Tomcat server)

```
mvn springboot:run
```

## Set project version using maven

```
mvn versions:set -DartifactId=*  -DgroupId=*
```

Note: If using STS4, see the **Boot Dashboard** window instead of using the Maven command above.

## Application Entry point

```
http://localhost:8082/ecrc/
```

## Autodeploy

This application will autodeploy after every save. (Due to Spring Boot Devtools in the POM).

## Docker

Do run api in Docker conatiner create .env file using .env.template.

Run command

```
docker-compose up --build -d
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
