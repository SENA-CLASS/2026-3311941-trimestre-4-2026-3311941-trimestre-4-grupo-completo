package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Year} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class YearDTO implements Serializable {

    private String id;

    @NotNull
    private Integer yearNumber;

    @NotNull
    private State yearState;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getYearNumber() {
        return yearNumber;
    }

    public void setYearNumber(Integer yearNumber) {
        this.yearNumber = yearNumber;
    }

    public State getYearState() {
        return yearState;
    }

    public void setYearState(State yearState) {
        this.yearState = yearState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof YearDTO)) {
            return false;
        }

        YearDTO yearDTO = (YearDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, yearDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "YearDTO{" +
            "id='" + getId() + "'" +
            ", yearNumber=" + getYearNumber() +
            ", yearState='" + getYearState() + "'" +
            "}";
    }
}
