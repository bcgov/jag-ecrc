#############################################################################################
###              Stage where Docker is building spring boot app using maven               ###
#############################################################################################
FROM maven:3.8.5-openjdk-17 as build

ARG PROXY_SET=false
ARG PROXY_HOST=
ARG PROXY_PORT=

ARG MVN_PROFILES
ARG ECRC_SERVICE_NAME

ENV ECRC_SERVICE_NAME=${ECRC_SERVICE_NAME}
ENV MVN_PROFILES=${MVN_PROFILES}

COPY . .

RUN mvn -B clean package \
        -DproxySet=${PROXY_SET} \
        -DproxyHost=${PROXY_HOST} \
        -DproxyPort=${PROXY_PORT} \
        -P ${MVN_PROFILES}
#############################################################################################

#############################################################################################
### Stage where Docker is running a java process to run a service built in previous stage ###
#############################################################################################
FROM eclipse-temurin:17-jre-alpine

ARG MVN_PROFILES
ARG ECRC_SERVICE_NAME

COPY --from=build /target/${ECRC_SERVICE_NAME}-*.jar /app/ecrc-api.jar


CMD ["java", "-jar", "/app/ecrc-api.jar"]
#############################################################################################