package co.edu.sena.clases.tema13;

import java.util.ArrayList;
import java.util.List;

public class App {
    public static void main(String[] args) {
        int a = 10; // la variable a se guarda en la pila

        String nombre = "hernando"; // la variable se guarda en heap


        Aprendiz a1 = new Aprendiz("juan ", "morales");
        Aprendiz a2 = new Aprendiz("juan ", "morales");
        Aprendiz a3 = new Aprendiz("juan ", "morales");
        Aprendiz a4 = new Aprendiz("juan ", "morales");
        Aprendiz a5 = new Aprendiz("juan ", "morales");

        System.out.println("cantidad de aprendices: " + Aprendiz.contadoAprendices);

        List<Aprendiz> aprendices = new ArrayList<>();
        aprendices.add(a1);
        aprendices.add(a2);
        aprendices.add(a3);
        aprendices.add(a4);
        aprendices.add(a5);

        System.out.println("cantidad de aprendices: " + aprendices.size());

        System.out.println("velocidad de la luz: " + ConstanteFisica.VELOCIDAD_LUZ);

        System.out.println("energia de un objeto con masa 1 kg: " + ConstanteFisica.calcularEnergia(1));

        System.out.println(Math.PI);


    }
}
