package ca.bc.gov.open.ecrc.testutil;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.io.StringWriter;

public class XMLStringUtil {

    private static final Logger logger = LoggerFactory.getLogger(XMLStringUtil.class);
    public static String jaxbObjectToXML(Object obj) {
        String xmlString = "";
        try {
            JAXBContext context = JAXBContext.newInstance(obj.getClass());
            Marshaller m = context.createMarshaller();

            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.FALSE);

            StringWriter sw = new StringWriter();
            m.marshal(obj, sw);
            xmlString = sw.toString();

        } catch (JAXBException e) {
            logger.error("Failed to marshall string");
        }

        return xmlString;
    }
}
