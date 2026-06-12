package co.edu.sena.domain;

import java.util.UUID;

public class LevelEducationTestSamples {

    public static LevelEducation getLevelEducationSample1() {
        return new LevelEducation().id("id1").levelName("levelName1");
    }

    public static LevelEducation getLevelEducationSample2() {
        return new LevelEducation().id("id2").levelName("levelName2");
    }

    public static LevelEducation getLevelEducationRandomSampleGenerator() {
        return new LevelEducation().id(UUID.randomUUID().toString()).levelName(UUID.randomUUID().toString());
    }
}
