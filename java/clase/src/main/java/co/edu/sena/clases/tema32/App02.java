package co.edu.sena.clases.tema32;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class App02 {
    public static void main(String[] args) {
        List<String> nombres = new ArrayList<>();
        nombres.add("juan");
        nombres.add("carlos");
        nombres.add("maria");
        nombres.add("pedro");


        for(String nombre: nombres){
            System.out.println(nombre);
        }

        Iterator<String> iterator = new Iterator<String>() {
            private int indice = 0;
            @Override
            public boolean hasNext() {
                return indice < nombres.size();
            }

            @Override
            public String next() {
                return nombres.get(indice++);
            }
        };

        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }



    }
}
