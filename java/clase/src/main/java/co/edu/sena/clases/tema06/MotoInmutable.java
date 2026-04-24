package co.edu.sena.clases.tema06;

public class MotoInmutable {
    private String marca;
    private String modelo;

    public MotoInmutable(String marca, String modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public String getModelo() {
        return modelo;
    }
}
