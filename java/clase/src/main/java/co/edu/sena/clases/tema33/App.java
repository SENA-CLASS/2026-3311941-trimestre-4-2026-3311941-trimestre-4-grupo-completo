package co.edu.sena.clases.tema33;

public class App {
    public static void main(String[] args) {
        Escalera escalera01 = new Escalera();
        escalera01.setId(1);
        escalera01.setNumeroPeldanios(10);
        escalera01.setMaterial("Madera");
        escalera01.setAlto(2.5);
        escalera01.setAncho(1.5);

        Escalera escalera02 = new Escalera();
        escalera02.setId(2);
        escalera02.setNumeroPeldanios(10);
        escalera02.setMaterial("Madera");
        escalera02.setAlto(2.5);
        escalera02.setAncho(1.5);

        if(escalera01.equals(escalera02)){
            System.out.println("Las escaleras son iguales");
        }else {
            System.out.println("Las escaleras son diferentes");
        }

        System.out.println(escalera01.hashCode());
        System.out.println(escalera02.hashCode());



    }
}
