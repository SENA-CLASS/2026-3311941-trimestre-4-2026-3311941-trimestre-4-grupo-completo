package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.BondingInstructor} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BondingInstructorDTO implements Serializable {

    private String id;

    @NotNull
    private LocalDate startTime;

    @NotNull
    private LocalDate endTime;

    @NotNull
    private YearDTO year;

    @NotNull
    private InstructorDTO instructor;

    @NotNull
    private BondingDTO bonding;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public YearDTO getYear() {
        return year;
    }

    public void setYear(YearDTO year) {
        this.year = year;
    }

    public InstructorDTO getInstructor() {
        return instructor;
    }

    public void setInstructor(InstructorDTO instructor) {
        this.instructor = instructor;
    }

    public BondingDTO getBonding() {
        return bonding;
    }

    public void setBonding(BondingDTO bonding) {
        this.bonding = bonding;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BondingInstructorDTO)) {
            return false;
        }

        BondingInstructorDTO bondingInstructorDTO = (BondingInstructorDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bondingInstructorDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BondingInstructorDTO{" +
            "id='" + getId() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", year=" + getYear() +
            ", instructor=" + getInstructor() +
            ", bonding=" + getBonding() +
            "}";
    }
}
