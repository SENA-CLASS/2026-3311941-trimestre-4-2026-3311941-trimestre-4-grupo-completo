package com.mycompany.project_yml.domain;

import com.mycompany.project_yml.domain.enumeration.Estado;
import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

public class Cuenta implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Nonnull
    @Field("nickname")
    @Size(max = 50)
    private String nickname;

    @Nonnull
    @Field("estado")
    private Estado estado;

    @DocumentReference
    @Field("cliente")
    private Cliente cliente;

    public Cuenta(String id, @Nonnull String nickname, @Nonnull Estado estado) {
        this.id = id;
        this.nickname = nickname;
        this.estado = estado;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Nonnull
    public String getNickname() {
        return nickname;
    }

    public void setNickname(@Nonnull String nickname) {
        this.nickname = nickname;
    }

    @Nonnull
    public Estado getEstado() {
        return estado;
    }

    public void setEstado(@Nonnull Estado estado) {
        this.estado = estado;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof Cuenta cuenta)) return false;

        return Objects.equals(id, cuenta.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
