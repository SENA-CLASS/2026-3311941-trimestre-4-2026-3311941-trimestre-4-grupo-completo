package co.edu.sena.domain;

import java.util.UUID;

public class MemberGroupTestSamples {

    public static MemberGroup getMemberGroupSample1() {
        return new MemberGroup().id("id1");
    }

    public static MemberGroup getMemberGroupSample2() {
        return new MemberGroup().id("id2");
    }

    public static MemberGroup getMemberGroupRandomSampleGenerator() {
        return new MemberGroup().id(UUID.randomUUID().toString());
    }
}
