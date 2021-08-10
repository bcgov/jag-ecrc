package ca.bc.gov.open.ecrcintegration.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invoke")
@Slf4j
public class EchoController {

    @Autowired
    public EchoController() {}

    @GetMapping("/VCRC.Source.EchoTest.Services/echoTest")
    public Object echoTest() {
        return null;
    }

    @GetMapping("/VCRC.Source.EchoTestProxy.Services/echoTestProxy")
    public Object echoTestProxy() {
        return null;
    }
}
