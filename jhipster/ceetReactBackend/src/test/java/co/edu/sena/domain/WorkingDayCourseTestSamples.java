package co.edu.sena.domain;

import java.util.UUID;

public class WorkingDayCourseTestSamples {

    public static WorkingDayCourse getWorkingDayCourseSample1() {
        return new WorkingDayCourse()
            .id("id1")
            .workingDayAcronym("workingDayAcronym1")
            .workingDayName("workingDayName1")
            .description("description1")
            .imageUrl("imageUrl1");
    }

    public static WorkingDayCourse getWorkingDayCourseSample2() {
        return new WorkingDayCourse()
            .id("id2")
            .workingDayAcronym("workingDayAcronym2")
            .workingDayName("workingDayName2")
            .description("description2")
            .imageUrl("imageUrl2");
    }

    public static WorkingDayCourse getWorkingDayCourseRandomSampleGenerator() {
        return new WorkingDayCourse()
            .id(UUID.randomUUID().toString())
            .workingDayAcronym(UUID.randomUUID().toString())
            .workingDayName(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .imageUrl(UUID.randomUUID().toString());
    }
}
