package co.edu.sena.clases.tema22;

/**
 * POJO que es un Plain Old Java Object, es decir, una clase que solo tiene atributos, constructores, getters y setters.
 *
 *
 */
public class Gato {
    private String nombre;
    private String raza;

    public Gato(String nombre, String raza) {
        this.nombre = nombre;
        this.raza = raza;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }
}
