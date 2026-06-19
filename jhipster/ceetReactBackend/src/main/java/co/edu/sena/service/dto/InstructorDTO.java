package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Instructor} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InstructorDTO implements Serializable {

    private String id;

    @NotNull
    private State instructorState;

    @NotNull
    private CustomerDTO customer;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getInstructorState() {
        return instructorState;
    }

    public void setInstructorState(State instructorState) {
        this.instructorState = instructorState;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InstructorDTO)) {
            return false;
        }

        InstructorDTO instructorDTO = (InstructorDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, instructorDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InstructorDTO{" +
            "id='" + getId() + "'" +
            ", instructorState='" + getInstructorState() + "'" +
            ", customer=" + getCustomer() +
            "}";
    }
}
