package ca.bc.gov.open.ecrc.testutil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
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
