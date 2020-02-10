package ca.bc.gov.open.ecrc.utils;



import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.persistence.jaxb.JAXBContextFactory;
import org.eclipse.persistence.jaxb.JAXBContextProperties;
import org.eclipse.persistence.jaxb.xmlmodel.ObjectFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;


public final class ObjectToJSONUtil {
    static Logger logger = LoggerFactory.getLogger(ObjectToJSONUtil.class);
    public static String jaxbObjectToJSON(Object object)
    {
        StringWriter stringWriter = new StringWriter();
        try
        {
            Map<String, Object> properties = new HashMap<>();
            properties.put(JAXBContextProperties.MEDIA_TYPE, "application/json");
            properties.put(JAXBContextProperties.JSON_INCLUDE_ROOT, false);

            //Create a Context using the properties
            JAXBContext jaxbContext =
                    JAXBContextFactory.createContext(new Class[]  {
                            object.getClass(),    ObjectFactory.class}, properties);
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            //Marshall the object

            jaxbMarshaller.marshal(object, stringWriter);

        }
        catch (Exception e)
        {
            logger.error("Error in mapping object to JSON");
        }
        return stringWriter.toString();
    }
}
