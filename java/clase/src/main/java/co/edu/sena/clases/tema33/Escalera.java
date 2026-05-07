package co.edu.sena.clases.tema33;

import java.util.Objects;

public class Escalera {
    private int id;
    private  int numeroPeldanios;
    private String material;
    private double ancho;
    private double alto;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumeroPeldanios() {
        return numeroPeldanios;
    }

    public void setNumeroPeldanios(int numeroPeldanios) {
        this.numeroPeldanios = numeroPeldanios;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public double getAncho() {
        return ancho;
    }

    public void setAncho(double ancho) {
        this.ancho = ancho;
    }

    public double getAlto() {
        return alto;
    }

    public void setAlto(double alto) {
        this.alto = alto;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof Escalera escalera)) return false;

        return id == escalera.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
