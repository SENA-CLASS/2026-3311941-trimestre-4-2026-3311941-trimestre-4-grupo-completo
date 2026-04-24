package co.edu.sena.clases.tema06;

public class Moto {
    private String marca;
    private String modelo;
    private int velocidad;

    public Moto(String marca, String modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void acelerar(){
        this.velocidad+= 10;
    }


}
