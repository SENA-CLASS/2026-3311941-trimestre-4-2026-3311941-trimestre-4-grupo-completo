package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ScheduleVersion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ScheduleVersionDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 40)
    private String versionNumber;

    @NotNull
    private State versionState;

    @NotNull
    private CurrentQuarterDTO currentQuarter;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVersionNumber() {
        return versionNumber;
    }

    public void setVersionNumber(String versionNumber) {
        this.versionNumber = versionNumber;
    }

    public State getVersionState() {
        return versionState;
    }

    public void setVersionState(State versionState) {
        this.versionState = versionState;
    }

    public CurrentQuarterDTO getCurrentQuarter() {
        return currentQuarter;
    }

    public void setCurrentQuarter(CurrentQuarterDTO currentQuarter) {
        this.currentQuarter = currentQuarter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ScheduleVersionDTO)) {
            return false;
        }

        ScheduleVersionDTO scheduleVersionDTO = (ScheduleVersionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, scheduleVersionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ScheduleVersionDTO{" +
            "id='" + getId() + "'" +
            ", versionNumber='" + getVersionNumber() + "'" +
            ", versionState='" + getVersionState() + "'" +
            ", currentQuarter=" + getCurrentQuarter() +
            "}";
    }
}
