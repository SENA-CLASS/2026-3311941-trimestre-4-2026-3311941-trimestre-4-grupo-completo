package com.mycompany.ejemplo04.domain.enumeration;

/**
 * The Estado enumeration.
 */
public enum Estado {
    ACTIVO("Activo"),
    INACTIVO("Inactivo");

    private final String value;

    Estado(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
