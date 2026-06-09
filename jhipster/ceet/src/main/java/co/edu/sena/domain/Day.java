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
 * A Day.
 */
@Document(collection = "day")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Day implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("day_name")
    private String dayName;

    @NotNull
    @Field("day_state")
    private State dayState;

    @DBRef
    @Field("schedule")
    @JsonIgnoreProperties(
        value = { "scheduleVersion", "modality", "day", "courseTrimester", "classroom", "instructor" },
        allowSetters = true
    )
    private Set<Schedule> schedules = new HashSet<>();

    @DBRef
    @Field("workingDay")
    @JsonIgnoreProperties(value = { "instructorWorkingDay", "day" }, allowSetters = true)
    private Set<WorkingDay> workingDays = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Day id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDayName() {
        return this.dayName;
    }

    public Day dayName(String dayName) {
        this.setDayName(dayName);
        return this;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public State getDayState() {
        return this.dayState;
    }

    public Day dayState(State dayState) {
        this.setDayState(dayState);
        return this;
    }

    public void setDayState(State dayState) {
        this.dayState = dayState;
    }

    public Set<Schedule> getSchedules() {
        return this.schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        if (this.schedules != null) {
            this.schedules.forEach(i -> i.setDay(null));
        }
        if (schedules != null) {
            schedules.forEach(i -> i.setDay(this));
        }
        this.schedules = schedules;
    }

    public Day schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public Day addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setDay(this);
        return this;
    }

    public Day removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setDay(null);
        return this;
    }

    public Set<WorkingDay> getWorkingDays() {
        return this.workingDays;
    }

    public void setWorkingDays(Set<WorkingDay> workingDays) {
        if (this.workingDays != null) {
            this.workingDays.forEach(i -> i.setDay(null));
        }
        if (workingDays != null) {
            workingDays.forEach(i -> i.setDay(this));
        }
        this.workingDays = workingDays;
    }

    public Day workingDays(Set<WorkingDay> workingDays) {
        this.setWorkingDays(workingDays);
        return this;
    }

    public Day addWorkingDay(WorkingDay workingDay) {
        this.workingDays.add(workingDay);
        workingDay.setDay(this);
        return this;
    }

    public Day removeWorkingDay(WorkingDay workingDay) {
        this.workingDays.remove(workingDay);
        workingDay.setDay(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Day)) {
            return false;
        }
        return getId() != null && getId().equals(((Day) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Day{" +
            "id=" + getId() +
            ", dayName='" + getDayName() + "'" +
            ", dayState='" + getDayState() + "'" +
            "}";
    }
}
