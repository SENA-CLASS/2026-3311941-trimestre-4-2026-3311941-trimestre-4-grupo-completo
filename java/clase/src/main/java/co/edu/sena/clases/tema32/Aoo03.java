package co.edu.sena.clases.tema32;

public class Aoo03 {
    public static void main(String[] args) {
        class Botella {
            private int id;
            private String marcar;

            public int getId() {
                return id;
            }

            public void setId(int id) {
                this.id = id;
            }

            public String getMarcar() {
                return marcar;
            }

            public void setMarcar(String marcar) {
                this.marcar = marcar;
            }
        }

        Botella botella = new Botella();
        botella.setId(1);
        botella.setMarcar("marca gao");
        System.out.println(botella.getId());
        System.out.println(botella.getMarcar());
    }
}
