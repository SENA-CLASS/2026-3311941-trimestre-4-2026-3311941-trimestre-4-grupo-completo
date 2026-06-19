package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.WorkingDayCourse} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WorkingDayCourseDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 20)
    private String workingDayAcronym;

    @NotNull
    @Size(max = 40)
    private String workingDayName;

    @NotNull
    @Size(max = 100)
    private String description;

    @Size(max = 100)
    private String imageUrl;

    @NotNull
    private State stateWorkingDay;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWorkingDayAcronym() {
        return workingDayAcronym;
    }

    public void setWorkingDayAcronym(String workingDayAcronym) {
        this.workingDayAcronym = workingDayAcronym;
    }

    public String getWorkingDayName() {
        return workingDayName;
    }

    public void setWorkingDayName(String workingDayName) {
        this.workingDayName = workingDayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public State getStateWorkingDay() {
        return stateWorkingDay;
    }

    public void setStateWorkingDay(State stateWorkingDay) {
        this.stateWorkingDay = stateWorkingDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkingDayCourseDTO)) {
            return false;
        }

        WorkingDayCourseDTO workingDayCourseDTO = (WorkingDayCourseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, workingDayCourseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WorkingDayCourseDTO{" +
            "id='" + getId() + "'" +
            ", workingDayAcronym='" + getWorkingDayAcronym() + "'" +
            ", workingDayName='" + getWorkingDayName() + "'" +
            ", description='" + getDescription() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", stateWorkingDay='" + getStateWorkingDay() + "'" +
            "}";
    }
}
