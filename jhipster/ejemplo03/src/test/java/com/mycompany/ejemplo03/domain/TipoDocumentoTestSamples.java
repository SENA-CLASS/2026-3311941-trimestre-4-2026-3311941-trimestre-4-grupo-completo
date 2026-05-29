package com.mycompany.ejemplo03.domain;

import java.util.UUID;

public class TipoDocumentoTestSamples {

    public static TipoDocumento getTipoDocumentoSample1() {
        return new TipoDocumento().id("id1").sigla("sigla1").nombreDocumento("nombreDocumento1");
    }

    public static TipoDocumento getTipoDocumentoSample2() {
        return new TipoDocumento().id("id2").sigla("sigla2").nombreDocumento("nombreDocumento2");
    }

    public static TipoDocumento getTipoDocumentoRandomSampleGenerator() {
        return new TipoDocumento()
            .id(UUID.randomUUID().toString())
            .sigla(UUID.randomUUID().toString())
            .nombreDocumento(UUID.randomUUID().toString());
    }
}
