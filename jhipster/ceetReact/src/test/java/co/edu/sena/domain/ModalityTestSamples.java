package co.edu.sena.domain;

import java.util.UUID;

public class ModalityTestSamples {

    public static Modality getModalitySample1() {
        return new Modality().id("id1").modalityName("modalityName1").modalityColor("modalityColor1");
    }

    public static Modality getModalitySample2() {
        return new Modality().id("id2").modalityName("modalityName2").modalityColor("modalityColor2");
    }

    public static Modality getModalityRandomSampleGenerator() {
        return new Modality()
            .id(UUID.randomUUID().toString())
            .modalityName(UUID.randomUUID().toString())
            .modalityColor(UUID.randomUUID().toString());
    }
}
