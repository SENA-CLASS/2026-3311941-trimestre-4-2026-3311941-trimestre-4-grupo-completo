package co.edu.sena.domain;

import java.util.UUID;

public class AreaTestSamples {

    public static Area getAreaSample1() {
        return new Area().id("id1").areaName("areaName1").urlLogo("urlLogo1");
    }

    public static Area getAreaSample2() {
        return new Area().id("id2").areaName("areaName2").urlLogo("urlLogo2");
    }

    public static Area getAreaRandomSampleGenerator() {
        return new Area().id(UUID.randomUUID().toString()).areaName(UUID.randomUUID().toString()).urlLogo(UUID.randomUUID().toString());
    }
}
