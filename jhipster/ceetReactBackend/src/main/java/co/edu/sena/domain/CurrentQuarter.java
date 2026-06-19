package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A CurrentQuarter.
 */
@Document(collection = "current_quarter")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CurrentQuarter implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("scheduled_quarter")
    private Integer scheduledQuarter;

    @NotNull
    @Field("start_quarter")
    private LocalDate startQuarter;

    @NotNull
    @Field("end_quarter")
    private LocalDate endQuarter;

    @NotNull
    @Field("current_quarter_state")
    private State currentQuarterState;

    @DBRef
    @Field("scheduleVersion")
    @JsonIgnoreProperties(value = { "schedules", "currentQuarter" }, allowSetters = true)
    private Set<ScheduleVersion> scheduleVersions = new HashSet<>();

    @DBRef
    @Field("year")
    @JsonIgnoreProperties(value = { "bondingInstructors", "currentQuarters" }, allowSetters = true)
    private Year year;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CurrentQuarter id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getScheduledQuarter() {
        return this.scheduledQuarter;
    }

    public CurrentQuarter scheduledQuarter(Integer scheduledQuarter) {
        this.setScheduledQuarter(scheduledQuarter);
        return this;
    }

    public void setScheduledQuarter(Integer scheduledQuarter) {
        this.scheduledQuarter = scheduledQuarter;
    }

    public LocalDate getStartQuarter() {
        return this.startQuarter;
    }

    public CurrentQuarter startQuarter(LocalDate startQuarter) {
        this.setStartQuarter(startQuarter);
        return this;
    }

    public void setStartQuarter(LocalDate startQuarter) {
        this.startQuarter = startQuarter;
    }

    public LocalDate getEndQuarter() {
        return this.endQuarter;
    }

    public CurrentQuarter endQuarter(LocalDate endQuarter) {
        this.setEndQuarter(endQuarter);
        return this;
    }

    public void setEndQuarter(LocalDate endQuarter) {
        this.endQuarter = endQuarter;
    }

    public State getCurrentQuarterState() {
        return this.currentQuarterState;
    }

    public CurrentQuarter currentQuarterState(State currentQuarterState) {
        this.setCurrentQuarterState(currentQuarterState);
        return this;
    }

    public void setCurrentQuarterState(State currentQuarterState) {
        this.currentQuarterState = currentQuarterState;
    }

    public Set<ScheduleVersion> getScheduleVersions() {
        return this.scheduleVersions;
    }

    public void setScheduleVersions(Set<ScheduleVersion> scheduleVersions) {
        if (this.scheduleVersions != null) {
            this.scheduleVersions.forEach(i -> i.setCurrentQuarter(null));
        }
        if (scheduleVersions != null) {
            scheduleVersions.forEach(i -> i.setCurrentQuarter(this));
        }
        this.scheduleVersions = scheduleVersions;
    }

    public CurrentQuarter scheduleVersions(Set<ScheduleVersion> scheduleVersions) {
        this.setScheduleVersions(scheduleVersions);
        return this;
    }

    public CurrentQuarter addScheduleVersion(ScheduleVersion scheduleVersion) {
        this.scheduleVersions.add(scheduleVersion);
        scheduleVersion.setCurrentQuarter(this);
        return this;
    }

    public CurrentQuarter removeScheduleVersion(ScheduleVersion scheduleVersion) {
        this.scheduleVersions.remove(scheduleVersion);
        scheduleVersion.setCurrentQuarter(null);
        return this;
    }

    public Year getYear() {
        return this.year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public CurrentQuarter year(Year year) {
        this.setYear(year);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CurrentQuarter)) {
            return false;
        }
        return getId() != null && getId().equals(((CurrentQuarter) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CurrentQuarter{" +
            "id=" + getId() +
            ", scheduledQuarter=" + getScheduledQuarter() +
            ", startQuarter='" + getStartQuarter() + "'" +
            ", endQuarter='" + getEndQuarter() + "'" +
            ", currentQuarterState='" + getCurrentQuarterState() + "'" +
            "}";
    }
}
