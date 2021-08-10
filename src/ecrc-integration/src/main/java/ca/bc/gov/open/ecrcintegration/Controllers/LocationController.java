package ca.bc.gov.open.ecrcintegration.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invoke")
@Slf4j
public class LocationController {
    @Autowired
    public LocationController() {}

    @GetMapping("/VCRC.Source.GetCountryList.Services/getCountryListInternal")
    public Object getCountryList() {
        return null;
    }

    @GetMapping("/VCRC.Source.GetProvinceList.Services/getProvinceListInternal")
    public Object getProvinceList() {
        return null;
    }
}
