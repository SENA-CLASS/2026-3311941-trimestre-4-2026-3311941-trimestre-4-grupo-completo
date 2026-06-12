package co.edu.sena.domain.enumeration;

/**
 * The Limitation enumeration.
 */
public enum Limitation {
    WITH_LIMITATION("con limitación"),
    WITHOUT_LIMITATION("sin limitación");

    private final String value;

    Limitation(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
