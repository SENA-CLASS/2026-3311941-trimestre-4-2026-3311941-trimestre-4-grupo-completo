package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.BoundingSchedule} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BoundingScheduleDTO implements Serializable {

    private String id;

    @NotNull
    private BondingInstructorDTO bondingInstructor;

    @NotNull
    private InstructorWorkingDayDTO instructorWorkingDay;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BondingInstructorDTO getBondingInstructor() {
        return bondingInstructor;
    }

    public void setBondingInstructor(BondingInstructorDTO bondingInstructor) {
        this.bondingInstructor = bondingInstructor;
    }

    public InstructorWorkingDayDTO getInstructorWorkingDay() {
        return instructorWorkingDay;
    }

    public void setInstructorWorkingDay(InstructorWorkingDayDTO instructorWorkingDay) {
        this.instructorWorkingDay = instructorWorkingDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BoundingScheduleDTO)) {
            return false;
        }

        BoundingScheduleDTO boundingScheduleDTO = (BoundingScheduleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, boundingScheduleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BoundingScheduleDTO{" +
            "id='" + getId() + "'" +
            ", bondingInstructor=" + getBondingInstructor() +
            ", instructorWorkingDay=" + getInstructorWorkingDay() +
            "}";
    }
}
