package co.edu.sena.clases.tema13;

public class Aprendiz {
    public static int contadoAprendices=0;
    private String nombres;
    private String apellidos;

    public Aprendiz(String nombres, String apellidos) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        contadoAprendices++;
    }


}
