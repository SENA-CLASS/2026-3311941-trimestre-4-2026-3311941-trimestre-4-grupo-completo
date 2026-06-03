package com.mycompany.ejemplo04.domain;

import java.util.UUID;

public class CuentaTestSamples {

    public static Cuenta getCuentaSample1() {
        return new Cuenta()
            .id("id1")
            .numeroDocumento("numeroDocumento1")
            .primerNombre("primerNombre1")
            .segundoNombre("segundoNombre1")
            .primerApellido("primerApellido1")
            .segundoApellido("segundoApellido1");
    }

    public static Cuenta getCuentaSample2() {
        return new Cuenta()
            .id("id2")
            .numeroDocumento("numeroDocumento2")
            .primerNombre("primerNombre2")
            .segundoNombre("segundoNombre2")
            .primerApellido("primerApellido2")
            .segundoApellido("segundoApellido2");
    }

    public static Cuenta getCuentaRandomSampleGenerator() {
        return new Cuenta()
            .id(UUID.randomUUID().toString())
            .numeroDocumento(UUID.randomUUID().toString())
            .primerNombre(UUID.randomUUID().toString())
            .segundoNombre(UUID.randomUUID().toString())
            .primerApellido(UUID.randomUUID().toString())
            .segundoApellido(UUID.randomUUID().toString());
    }
}
