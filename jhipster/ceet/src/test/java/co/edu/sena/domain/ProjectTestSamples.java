package co.edu.sena.domain;

import java.util.UUID;

public class ProjectTestSamples {

    public static Project getProjectSample1() {
        return new Project().id("id1").projectCode("projectCode1").projectName("projectName1");
    }

    public static Project getProjectSample2() {
        return new Project().id("id2").projectCode("projectCode2").projectName("projectName2");
    }

    public static Project getProjectRandomSampleGenerator() {
        return new Project()
            .id(UUID.randomUUID().toString())
            .projectCode(UUID.randomUUID().toString())
            .projectName(UUID.randomUUID().toString());
    }
}
