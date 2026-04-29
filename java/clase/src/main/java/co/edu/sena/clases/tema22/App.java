package co.edu.sena.clases.tema22;

public class App {
    public static void main(String[] args) {
        Gato gato = new Gato("Michi", "Siames");
        System.out.println("El gato se llama: " + gato.getNombre() + " y es de raza: " + gato.getRaza());
        imprimirGato(new Gato("Garfield", "Naranja"));

    }

    public static void imprimirGato(Gato nombreParametro){

    }
}
