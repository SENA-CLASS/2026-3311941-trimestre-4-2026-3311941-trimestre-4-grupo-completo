package co.edu.sena.domain;

import java.util.UUID;

public class CampusTestSamples {

    public static Campus getCampusSample1() {
        return new Campus().id("id1").campusName("campusName1").campusAddress("campusAddress1");
    }

    public static Campus getCampusSample2() {
        return new Campus().id("id2").campusName("campusName2").campusAddress("campusAddress2");
    }

    public static Campus getCampusRandomSampleGenerator() {
        return new Campus()
            .id(UUID.randomUUID().toString())
            .campusName(UUID.randomUUID().toString())
            .campusAddress(UUID.randomUUID().toString());
    }
}
