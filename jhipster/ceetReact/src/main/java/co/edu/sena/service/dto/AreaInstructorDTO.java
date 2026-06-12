package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.AreaInstructor} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AreaInstructorDTO implements Serializable {

    private String id;

    @NotNull
    private State areaInstructorState;

    @NotNull
    private AreaDTO area;

    @NotNull
    private InstructorDTO instructor;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getAreaInstructorState() {
        return areaInstructorState;
    }

    public void setAreaInstructorState(State areaInstructorState) {
        this.areaInstructorState = areaInstructorState;
    }

    public AreaDTO getArea() {
        return area;
    }

    public void setArea(AreaDTO area) {
        this.area = area;
    }

    public InstructorDTO getInstructor() {
        return instructor;
    }

    public void setInstructor(InstructorDTO instructor) {
        this.instructor = instructor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AreaInstructorDTO)) {
            return false;
        }

        AreaInstructorDTO areaInstructorDTO = (AreaInstructorDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, areaInstructorDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AreaInstructorDTO{" +
            "id='" + getId() + "'" +
            ", areaInstructorState='" + getAreaInstructorState() + "'" +
            ", area=" + getArea() +
            ", instructor=" + getInstructor() +
            "}";
    }
}
