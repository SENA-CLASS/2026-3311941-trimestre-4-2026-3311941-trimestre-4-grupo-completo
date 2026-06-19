package co.edu.sena.domain;

import java.util.UUID;

public class ProjectPhaseTestSamples {

    public static ProjectPhase getProjectPhaseSample1() {
        return new ProjectPhase().id("id1").projectPhaseCode("projectPhaseCode1").projectPhaseState("projectPhaseState1");
    }

    public static ProjectPhase getProjectPhaseSample2() {
        return new ProjectPhase().id("id2").projectPhaseCode("projectPhaseCode2").projectPhaseState("projectPhaseState2");
    }

    public static ProjectPhase getProjectPhaseRandomSampleGenerator() {
        return new ProjectPhase()
            .id(UUID.randomUUID().toString())
            .projectPhaseCode(UUID.randomUUID().toString())
            .projectPhaseState(UUID.randomUUID().toString());
    }
}
