package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.InstructorWorkingDay} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InstructorWorkingDayDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 80)
    private String nameWorkingDay;

    @NotNull
    @Size(max = 200)
    private String descriptionWorkingDay;

    @NotNull
    private State workingDayState;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameWorkingDay() {
        return nameWorkingDay;
    }

    public void setNameWorkingDay(String nameWorkingDay) {
        this.nameWorkingDay = nameWorkingDay;
    }

    public String getDescriptionWorkingDay() {
        return descriptionWorkingDay;
    }

    public void setDescriptionWorkingDay(String descriptionWorkingDay) {
        this.descriptionWorkingDay = descriptionWorkingDay;
    }

    public State getWorkingDayState() {
        return workingDayState;
    }

    public void setWorkingDayState(State workingDayState) {
        this.workingDayState = workingDayState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InstructorWorkingDayDTO)) {
            return false;
        }

        InstructorWorkingDayDTO instructorWorkingDayDTO = (InstructorWorkingDayDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, instructorWorkingDayDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InstructorWorkingDayDTO{" +
            "id='" + getId() + "'" +
            ", nameWorkingDay='" + getNameWorkingDay() + "'" +
            ", descriptionWorkingDay='" + getDescriptionWorkingDay() + "'" +
            ", workingDayState='" + getWorkingDayState() + "'" +
            "}";
    }
}
