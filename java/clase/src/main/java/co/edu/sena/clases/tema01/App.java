package co.edu.sena.clases.tema01;

public class App {
    public static void main(String[] args) {
        // esto es una clase abstracta no se puede instanciar objetos de ella
        //Vehiculo miVehiculo = new Vehiculo();
        Llave miLlave = new Llave(); // objeto que es la instancia de una clase
        System.out.println(miLlave);


        String textoInicial = "Hola Mundo";
        String textoFinal = textoInicial.toUpperCase();
        System.out.println(textoFinal);


    }
}
