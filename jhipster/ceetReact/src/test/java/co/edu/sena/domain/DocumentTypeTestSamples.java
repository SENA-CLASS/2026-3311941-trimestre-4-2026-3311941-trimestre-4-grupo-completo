package co.edu.sena.domain;

import java.util.UUID;

public class DocumentTypeTestSamples {

    public static DocumentType getDocumentTypeSample1() {
        return new DocumentType().id("id1").initials("initials1").documentName("documentName1");
    }

    public static DocumentType getDocumentTypeSample2() {
        return new DocumentType().id("id2").initials("initials2").documentName("documentName2");
    }

    public static DocumentType getDocumentTypeRandomSampleGenerator() {
        return new DocumentType()
            .id(UUID.randomUUID().toString())
            .initials(UUID.randomUUID().toString())
            .documentName(UUID.randomUUID().toString());
    }
}
