package co.edu.sena.clases.tema16;

public class Mamifero extends Animal{
    @Override
    public void nacer() {
        System.out.println("Mamifero naciendo...");
    }

    public final void amamantar(){
        System.out.println("Mamifero amamantando...");
    }
}
