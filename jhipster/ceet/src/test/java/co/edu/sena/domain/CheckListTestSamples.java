package co.edu.sena.domain;

import java.util.UUID;

public class CheckListTestSamples {

    public static CheckList getCheckListSample1() {
        return new CheckList().id("id1").listName("listName1");
    }

    public static CheckList getCheckListSample2() {
        return new CheckList().id("id2").listName("listName2");
    }

    public static CheckList getCheckListRandomSampleGenerator() {
        return new CheckList().id(UUID.randomUUID().toString()).listName(UUID.randomUUID().toString());
    }
}
