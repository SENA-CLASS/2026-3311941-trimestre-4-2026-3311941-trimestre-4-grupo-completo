package co.edu.sena.clases.tema07;

public class Computador {
    private String marca;
    private String modelo;
    private int ram;


    // firma de este constructor es Computador()
    public Computador() {
        // constructor generico
    }

    /**
     * constructor con parametros
     *
     * @param marca
     * @param modelo
     * @param ram
     */
    // firma Computador(string, string, int)
    public Computador(String marca, String modelo, int ram) {
        this.marca = marca;
        this.modelo = modelo;
        this.ram = ram;
    }
}
