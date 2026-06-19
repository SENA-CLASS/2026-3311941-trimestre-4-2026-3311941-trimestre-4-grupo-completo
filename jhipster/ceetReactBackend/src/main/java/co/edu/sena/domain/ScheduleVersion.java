package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A ScheduleVersion.
 */
@Document(collection = "schedule_version")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ScheduleVersion implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("version_number")
    private String versionNumber;

    @NotNull
    @Field("version_state")
    private State versionState;

    @DBRef
    @Field("schedule")
    @JsonIgnoreProperties(
        value = { "scheduleVersion", "modality", "day", "courseTrimester", "classroom", "instructor" },
        allowSetters = true
    )
    private Set<Schedule> schedules = new HashSet<>();

    @DBRef
    @Field("currentQuarter")
    @JsonIgnoreProperties(value = { "scheduleVersions", "year" }, allowSetters = true)
    private CurrentQuarter currentQuarter;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ScheduleVersion id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVersionNumber() {
        return this.versionNumber;
    }

    public ScheduleVersion versionNumber(String versionNumber) {
        this.setVersionNumber(versionNumber);
        return this;
    }

    public void setVersionNumber(String versionNumber) {
        this.versionNumber = versionNumber;
    }

    public State getVersionState() {
        return this.versionState;
    }

    public ScheduleVersion versionState(State versionState) {
        this.setVersionState(versionState);
        return this;
    }

    public void setVersionState(State versionState) {
        this.versionState = versionState;
    }

    public Set<Schedule> getSchedules() {
        return this.schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        if (this.schedules != null) {
            this.schedules.forEach(i -> i.setScheduleVersion(null));
        }
        if (schedules != null) {
            schedules.forEach(i -> i.setScheduleVersion(this));
        }
        this.schedules = schedules;
    }

    public ScheduleVersion schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public ScheduleVersion addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setScheduleVersion(this);
        return this;
    }

    public ScheduleVersion removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setScheduleVersion(null);
        return this;
    }

    public CurrentQuarter getCurrentQuarter() {
        return this.currentQuarter;
    }

    public void setCurrentQuarter(CurrentQuarter currentQuarter) {
        this.currentQuarter = currentQuarter;
    }

    public ScheduleVersion currentQuarter(CurrentQuarter currentQuarter) {
        this.setCurrentQuarter(currentQuarter);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ScheduleVersion)) {
            return false;
        }
        return getId() != null && getId().equals(((ScheduleVersion) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ScheduleVersion{" +
            "id=" + getId() +
            ", versionNumber='" + getVersionNumber() + "'" +
            ", versionState='" + getVersionState() + "'" +
            "}";
    }
}
