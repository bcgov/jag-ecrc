package ca.bc.gov.open.ecrc.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@PropertySource("classpath:application.properties")
public class SwaggerConfig {

    @Value("${info.app.version}")
    private String version;

    ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("eCRC API")
                .description("Electronic Criminal Record Check API")
                .license("")
                .licenseUrl("")
                .termsOfServiceUrl("")
                .version(version)
                .build();
    }

    @Bean
    public Docket customImplementation(){

        // Note: Enable of service based on application configuration.

        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo())
                .enable(true);
    }
}
