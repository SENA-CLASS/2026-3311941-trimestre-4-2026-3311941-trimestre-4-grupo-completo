package co.edu.sena.clases.tema24.parametrico;

import java.util.ArrayList;
import java.util.List;

public class JaulaParametrica <E extends Animal> {
    private final List<E> lista = new ArrayList<>();

    public void agregarAnimal(E animal){
        this.lista.add(animal);
    }
}
