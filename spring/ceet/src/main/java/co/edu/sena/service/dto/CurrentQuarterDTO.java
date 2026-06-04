package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.CurrentQuarter} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CurrentQuarterDTO implements Serializable {

    private String id;

    @NotNull
    private Integer scheduledQuarter;

    @NotNull
    private LocalDate startQuarter;

    @NotNull
    private LocalDate endQuarter;

    @NotNull
    private State currentQuarterState;

    @NotNull
    private YearDTO year;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getScheduledQuarter() {
        return scheduledQuarter;
    }

    public void setScheduledQuarter(Integer scheduledQuarter) {
        this.scheduledQuarter = scheduledQuarter;
    }

    public LocalDate getStartQuarter() {
        return startQuarter;
    }

    public void setStartQuarter(LocalDate startQuarter) {
        this.startQuarter = startQuarter;
    }

    public LocalDate getEndQuarter() {
        return endQuarter;
    }

    public void setEndQuarter(LocalDate endQuarter) {
        this.endQuarter = endQuarter;
    }

    public State getCurrentQuarterState() {
        return currentQuarterState;
    }

    public void setCurrentQuarterState(State currentQuarterState) {
        this.currentQuarterState = currentQuarterState;
    }

    public YearDTO getYear() {
        return year;
    }

    public void setYear(YearDTO year) {
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CurrentQuarterDTO)) {
            return false;
        }

        CurrentQuarterDTO currentQuarterDTO = (CurrentQuarterDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, currentQuarterDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CurrentQuarterDTO{" +
            "id='" + getId() + "'" +
            ", scheduledQuarter=" + getScheduledQuarter() +
            ", startQuarter='" + getStartQuarter() + "'" +
            ", endQuarter='" + getEndQuarter() + "'" +
            ", currentQuarterState='" + getCurrentQuarterState() + "'" +
            ", year=" + getYear() +
            "}";
    }
}
