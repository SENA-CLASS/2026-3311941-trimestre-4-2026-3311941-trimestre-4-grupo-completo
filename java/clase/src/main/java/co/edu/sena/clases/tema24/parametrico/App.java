package co.edu.sena.clases.tema24.parametrico;

import java.util.ArrayList;
import java.util.List;

public class App {
    public static void main(String[] args) {

        Jaula jaula = new Jaula();
        jaula.agregarAnimal(new Leon());
        jaula.agregarAnimal(new Leon());
        jaula.agregarAnimal(new Gallina());
        jaula.agregarAnimal(new Gallina());
        jaula.agregarAnimal(new Gallina());
        jaula.agregarAnimal(new Gallina());


        JaulaParametrica<Leon> jaulaLeon = new JaulaParametrica<>();
        jaulaLeon.agregarAnimal(new Leon());
        jaulaLeon.agregarAnimal(new Leon());
        //jaulaLeon.agregarAnimal(new Gallina()); // Esto no se puede hacer porque


    }
}
