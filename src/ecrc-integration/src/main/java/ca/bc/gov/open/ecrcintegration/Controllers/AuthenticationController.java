package ca.bc.gov.open.ecrcintegration.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invoke")
@Slf4j
public class AuthenticationController {
    @Autowired
    public AuthenticationController() {}

    @GetMapping("/VCRC.Source.DoAuthenticateUser.Services/doAuthenticateUser")
    public Object authenticateUser(@RequestParam Long OrgTicketNumber) {
        return null;
    }
}
