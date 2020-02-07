# ecrc-api

This application provides the eCRC API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
 
Possibly STS4 (Used to create this initial code base). 

Note: Clone the repo then import as a 'Maven' project into STS4.

### Environmental variables

The following Windows environmental variables must be set to ensure the Wildfly plugin finds your server at deployment time: 

| Variable                   | Example Value                |
| -------------------------- |-----------------------------:|
|                            |                              |
|                            |                              |
|                            |                              |

### Installing

```
mvn clean install
```

## Run locally (Tomcat server)

```
mvn springboot:run
```

Note: If using STS4, see the **Boot Dashboard** window instead of using the Maven command above. 

## Application Entry point

```
http://localhost:8082/ecrc/
```

## Autodeploy

This application will autodeploy after every save. (Due to Spring Boot Devtools in the POM).  

## Built With

TBD

## Contributing

TBD

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

TBD

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

## Outstanding 


