package co.edu.sena.clases.tema23;

public class Iphone extends Celular{
    public Iphone(String modelo, String referencia) {
        super(modelo, referencia); // llamando al constructor de la clase padre (Celular)
        this.llamar();
    }

    @Override
    public void llamar() {
        System.out.println("ring ring... soy un Iphone");
    }
}
