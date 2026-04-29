package co.edu.sena.clases.tema24;

import java.io.Serializable;

public class App {
    public static void main(String[] args) {
        Perro perro =new Perro();
        Gato gato = new Gato();

        validarAnimal(perro);
        validarAnimal(gato);

        var objeto = (Object)perro; // casting o conversión de tipos

        Perro perro1 = (Perro) objeto; // casting o conversión de tipos

        System.out.println("El objeto es de tipo: " + objeto.getClass().getSimpleName());

        System.out.println(perro1);

        Animal animal = new Animal();
        System.out.println(animal);
        //Perro p = (Perro) animal; // Esto lanzará una excepción ClassCastException en tiempo de ejecución


        String nombre = "jose";
        Serializable s = (Serializable) nombre; // Esto es válido porque String implementa Serializable

        System.out.println(s);

        int a = 10;
        System.out.println(a);

        Integer b = a;
        System.out.println(b);

    }

    public static void validarAnimal(Animal animal){
        if(animal instanceof Gato){
            System.out.println("Es un gato");
        } else if(animal instanceof Perro){
            System.out.println("Es un perro");
        } else {
            System.out.println("Es otro tipo de animal");
        }
    }
}
