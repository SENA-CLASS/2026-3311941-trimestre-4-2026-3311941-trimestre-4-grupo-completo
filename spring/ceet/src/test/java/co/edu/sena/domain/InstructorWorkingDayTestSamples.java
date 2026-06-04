package co.edu.sena.domain;

import java.util.UUID;

public class InstructorWorkingDayTestSamples {

    public static InstructorWorkingDay getInstructorWorkingDaySample1() {
        return new InstructorWorkingDay().id("id1").nameWorkingDay("nameWorkingDay1").descriptionWorkingDay("descriptionWorkingDay1");
    }

    public static InstructorWorkingDay getInstructorWorkingDaySample2() {
        return new InstructorWorkingDay().id("id2").nameWorkingDay("nameWorkingDay2").descriptionWorkingDay("descriptionWorkingDay2");
    }

    public static InstructorWorkingDay getInstructorWorkingDayRandomSampleGenerator() {
        return new InstructorWorkingDay()
            .id(UUID.randomUUID().toString())
            .nameWorkingDay(UUID.randomUUID().toString())
            .descriptionWorkingDay(UUID.randomUUID().toString());
    }
}
