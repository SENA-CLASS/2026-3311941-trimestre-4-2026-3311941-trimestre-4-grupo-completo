package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Duration;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.WorkingDay} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WorkingDayDTO implements Serializable {

    private String id;

    @NotNull
    private Duration startTime;

    @NotNull
    private Duration endTime;

    @NotNull
    private InstructorWorkingDayDTO instructorWorkingDay;

    @NotNull
    private DayDTO day;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Duration getStartTime() {
        return startTime;
    }

    public void setStartTime(Duration startTime) {
        this.startTime = startTime;
    }

    public Duration getEndTime() {
        return endTime;
    }

    public void setEndTime(Duration endTime) {
        this.endTime = endTime;
    }

    public InstructorWorkingDayDTO getInstructorWorkingDay() {
        return instructorWorkingDay;
    }

    public void setInstructorWorkingDay(InstructorWorkingDayDTO instructorWorkingDay) {
        this.instructorWorkingDay = instructorWorkingDay;
    }

    public DayDTO getDay() {
        return day;
    }

    public void setDay(DayDTO day) {
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkingDayDTO)) {
            return false;
        }

        WorkingDayDTO workingDayDTO = (WorkingDayDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, workingDayDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WorkingDayDTO{" +
            "id='" + getId() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", instructorWorkingDay=" + getInstructorWorkingDay() +
            ", day=" + getDay() +
            "}";
    }
}
