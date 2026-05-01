package co.edu.sena.clases.tema26.composition;

import java.util.ArrayList;
import java.util.List;

public class Caballo {
    private Cerebro cerebro;
    private List<Pata> pataList;
    private Montura montura;

    public Caballo(){
        this.cerebro = new Cerebro();
        this.pataList = new ArrayList<>();
        this.pataList.add(new Pata());
        this.pataList.add(new Pata());
        this.pataList.add(new Pata());
        this.pataList.add(new Pata());
    }

    public Montura getMontura() {
        return montura;
    }

    public void setMontura(Montura montura) {
        this.montura = montura;
    }

    public Cerebro getCerebro() {
        return cerebro;
    }

    public void setCerebro(Cerebro cerebro) {
        this.cerebro = cerebro;
    }

    public List<Pata> getPataList() {
        return pataList;
    }

    public void setPataList(List<Pata> pataList) {
        this.pataList = pataList;
    }
}
