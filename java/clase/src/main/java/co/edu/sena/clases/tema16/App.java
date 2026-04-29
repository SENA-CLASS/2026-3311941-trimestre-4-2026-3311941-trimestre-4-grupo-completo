package co.edu.sena.clases.tema16;

public class App {
    public static void main(String[] args) {
        var gallina = new Gallina();
        gallina.setGenero("Hembra");
        System.out.println("La gallina es del genero: " + gallina.getGenero());
    }
}
