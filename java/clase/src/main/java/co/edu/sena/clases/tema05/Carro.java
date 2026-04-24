package co.edu.sena.clases.tema05;

public class Carro {

    public void prende(){
        System.out.println("El carro se prende");
    }

    public String pitar(){
        return "Piiii";
    }

    public void acelerar(int fuerzaPedal){// fuerzaPedal es un parametro
        System.out.println("El carro acelera con una fuerza de: "+fuerzaPedal);
    }
}

