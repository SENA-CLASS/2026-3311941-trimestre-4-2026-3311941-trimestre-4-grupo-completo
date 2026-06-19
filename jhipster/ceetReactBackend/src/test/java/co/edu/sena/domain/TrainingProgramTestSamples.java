package co.edu.sena.domain;

import java.util.UUID;

public class TrainingProgramTestSamples {

    public static TrainingProgram getTrainingProgramSample1() {
        return new TrainingProgram()
            .id("id1")
            .programCode("programCode1")
            .programVersion("programVersion1")
            .programName("programName1")
            .programInitials("programInitials1");
    }

    public static TrainingProgram getTrainingProgramSample2() {
        return new TrainingProgram()
            .id("id2")
            .programCode("programCode2")
            .programVersion("programVersion2")
            .programName("programName2")
            .programInitials("programInitials2");
    }

    public static TrainingProgram getTrainingProgramRandomSampleGenerator() {
        return new TrainingProgram()
            .id(UUID.randomUUID().toString())
            .programCode(UUID.randomUUID().toString())
            .programVersion(UUID.randomUUID().toString())
            .programName(UUID.randomUUID().toString())
            .programInitials(UUID.randomUUID().toString());
    }
}
