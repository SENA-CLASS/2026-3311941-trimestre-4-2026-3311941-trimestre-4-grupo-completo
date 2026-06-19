package co.edu.sena.domain;

import java.util.UUID;

public class GroupResponseTestSamples {

    public static GroupResponse getGroupResponseSample1() {
        return new GroupResponse().id("id1");
    }

    public static GroupResponse getGroupResponseSample2() {
        return new GroupResponse().id("id2");
    }

    public static GroupResponse getGroupResponseRandomSampleGenerator() {
        return new GroupResponse().id(UUID.randomUUID().toString());
    }
}
