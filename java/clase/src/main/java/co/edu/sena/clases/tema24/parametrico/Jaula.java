package co.edu.sena.clases.tema24.parametrico;

import java.util.ArrayList;
import java.util.List;

public class Jaula {
    private final List<Animal> animalList = new ArrayList<>();

    public void agregarAnimal(Animal animal){
        animalList.add(animal);
    }


}
