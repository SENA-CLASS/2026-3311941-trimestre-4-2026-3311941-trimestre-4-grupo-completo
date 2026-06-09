package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.Duration;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A WorkingDay.
 */
@Document(collection = "working_day")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WorkingDay implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("start_time")
    private Duration startTime;

    @NotNull
    @Field("end_time")
    private Duration endTime;

    @DBRef
    @Field("instructorWorkingDay")
    @JsonIgnoreProperties(value = { "boundingSchedules", "workingDays" }, allowSetters = true)
    private InstructorWorkingDay instructorWorkingDay;

    @DBRef
    @Field("day")
    @JsonIgnoreProperties(value = { "schedules", "workingDays" }, allowSetters = true)
    private Day day;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public WorkingDay id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Duration getStartTime() {
        return this.startTime;
    }

    public WorkingDay startTime(Duration startTime) {
        this.setStartTime(startTime);
        return this;
    }

    public void setStartTime(Duration startTime) {
        this.startTime = startTime;
    }

    public Duration getEndTime() {
        return this.endTime;
    }

    public WorkingDay endTime(Duration endTime) {
        this.setEndTime(endTime);
        return this;
    }

    public void setEndTime(Duration endTime) {
        this.endTime = endTime;
    }

    public InstructorWorkingDay getInstructorWorkingDay() {
        return this.instructorWorkingDay;
    }

    public void setInstructorWorkingDay(InstructorWorkingDay instructorWorkingDay) {
        this.instructorWorkingDay = instructorWorkingDay;
    }

    public WorkingDay instructorWorkingDay(InstructorWorkingDay instructorWorkingDay) {
        this.setInstructorWorkingDay(instructorWorkingDay);
        return this;
    }

    public Day getDay() {
        return this.day;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public WorkingDay day(Day day) {
        this.setDay(day);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkingDay)) {
            return false;
        }
        return getId() != null && getId().equals(((WorkingDay) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WorkingDay{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }
}
