package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Bonding} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BondingDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 40)
    private String bondingType;

    @NotNull
    private Integer workingHours;

    @NotNull
    private State bondingState;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBondingType() {
        return bondingType;
    }

    public void setBondingType(String bondingType) {
        this.bondingType = bondingType;
    }

    public Integer getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(Integer workingHours) {
        this.workingHours = workingHours;
    }

    public State getBondingState() {
        return bondingState;
    }

    public void setBondingState(State bondingState) {
        this.bondingState = bondingState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BondingDTO)) {
            return false;
        }

        BondingDTO bondingDTO = (BondingDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bondingDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BondingDTO{" +
            "id='" + getId() + "'" +
            ", bondingType='" + getBondingType() + "'" +
            ", workingHours=" + getWorkingHours() +
            ", bondingState='" + getBondingState() + "'" +
            "}";
    }
}
