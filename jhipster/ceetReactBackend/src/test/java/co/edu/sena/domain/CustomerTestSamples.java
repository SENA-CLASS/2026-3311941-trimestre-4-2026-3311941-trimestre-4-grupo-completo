package co.edu.sena.domain;

import java.util.UUID;

public class CustomerTestSamples {

    public static Customer getCustomerSample1() {
        return new Customer()
            .id("id1")
            .documentNumber("documentNumber1")
            .firstName("firstName1")
            .secondName("secondName1")
            .fisrtLastName("fisrtLastName1")
            .secondLastName("secondLastName1");
    }

    public static Customer getCustomerSample2() {
        return new Customer()
            .id("id2")
            .documentNumber("documentNumber2")
            .firstName("firstName2")
            .secondName("secondName2")
            .fisrtLastName("fisrtLastName2")
            .secondLastName("secondLastName2");
    }

    public static Customer getCustomerRandomSampleGenerator() {
        return new Customer()
            .id(UUID.randomUUID().toString())
            .documentNumber(UUID.randomUUID().toString())
            .firstName(UUID.randomUUID().toString())
            .secondName(UUID.randomUUID().toString())
            .fisrtLastName(UUID.randomUUID().toString())
            .secondLastName(UUID.randomUUID().toString());
    }
}
