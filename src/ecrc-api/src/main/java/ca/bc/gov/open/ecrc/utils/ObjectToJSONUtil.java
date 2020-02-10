package ca.bc.gov.open.ecrc.utils;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.StringWriter;
import org.eclipse.persistence.jaxb.MarshallerProperties;


public final class ObjectToJSONUtil {
    public static String jaxbObjectToJSON(Object object)
    {
        try
        {
            JAXBContext jaxbContext = JAXBContext.newInstance(object.getClass());
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            // To format JSON
            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            //Set JSON type
            jaxbMarshaller.setProperty(MarshallerProperties.MEDIA_TYPE, "application/json");
            jaxbMarshaller.setProperty(MarshallerProperties.JSON_INCLUDE_ROOT, true);


            StringWriter sw = new StringWriter();
            jaxbMarshaller.marshal(object, sw);
            return sw.toString();
        }
        catch (JAXBException e)
        {
            e.printStackTrace();
        }
        finally {
            return null;
        }
    }
}
