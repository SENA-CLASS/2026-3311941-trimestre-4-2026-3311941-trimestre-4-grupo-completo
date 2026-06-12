package co.edu.sena.domain;

import java.util.UUID;

public class BondingCompetenceTestSamples {

    public static BondingCompetence getBondingCompetenceSample1() {
        return new BondingCompetence().id("id1");
    }

    public static BondingCompetence getBondingCompetenceSample2() {
        return new BondingCompetence().id("id2");
    }

    public static BondingCompetence getBondingCompetenceRandomSampleGenerator() {
        return new BondingCompetence().id(UUID.randomUUID().toString());
    }
}
