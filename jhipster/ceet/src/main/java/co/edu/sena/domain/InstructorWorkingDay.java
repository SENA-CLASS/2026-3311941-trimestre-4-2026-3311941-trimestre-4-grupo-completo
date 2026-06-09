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
 * A InstructorWorkingDay.
 */
@Document(collection = "instructor_working_day")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InstructorWorkingDay implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 80)
    @Field("name_working_day")
    private String nameWorkingDay;

    @NotNull
    @Size(max = 200)
    @Field("description_working_day")
    private String descriptionWorkingDay;

    @NotNull
    @Field("working_day_state")
    private State workingDayState;

    @DBRef
    @Field("boundingSchedule")
    @JsonIgnoreProperties(value = { "bondingInstructor", "instructorWorkingDay" }, allowSetters = true)
    private Set<BoundingSchedule> boundingSchedules = new HashSet<>();

    @DBRef
    @Field("workingDay")
    @JsonIgnoreProperties(value = { "instructorWorkingDay", "day" }, allowSetters = true)
    private Set<WorkingDay> workingDays = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public InstructorWorkingDay id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameWorkingDay() {
        return this.nameWorkingDay;
    }

    public InstructorWorkingDay nameWorkingDay(String nameWorkingDay) {
        this.setNameWorkingDay(nameWorkingDay);
        return this;
    }

    public void setNameWorkingDay(String nameWorkingDay) {
        this.nameWorkingDay = nameWorkingDay;
    }

    public String getDescriptionWorkingDay() {
        return this.descriptionWorkingDay;
    }

    public InstructorWorkingDay descriptionWorkingDay(String descriptionWorkingDay) {
        this.setDescriptionWorkingDay(descriptionWorkingDay);
        return this;
    }

    public void setDescriptionWorkingDay(String descriptionWorkingDay) {
        this.descriptionWorkingDay = descriptionWorkingDay;
    }

    public State getWorkingDayState() {
        return this.workingDayState;
    }

    public InstructorWorkingDay workingDayState(State workingDayState) {
        this.setWorkingDayState(workingDayState);
        return this;
    }

    public void setWorkingDayState(State workingDayState) {
        this.workingDayState = workingDayState;
    }

    public Set<BoundingSchedule> getBoundingSchedules() {
        return this.boundingSchedules;
    }

    public void setBoundingSchedules(Set<BoundingSchedule> boundingSchedules) {
        if (this.boundingSchedules != null) {
            this.boundingSchedules.forEach(i -> i.setInstructorWorkingDay(null));
        }
        if (boundingSchedules != null) {
            boundingSchedules.forEach(i -> i.setInstructorWorkingDay(this));
        }
        this.boundingSchedules = boundingSchedules;
    }

    public InstructorWorkingDay boundingSchedules(Set<BoundingSchedule> boundingSchedules) {
        this.setBoundingSchedules(boundingSchedules);
        return this;
    }

    public InstructorWorkingDay addBoundingSchedule(BoundingSchedule boundingSchedule) {
        this.boundingSchedules.add(boundingSchedule);
        boundingSchedule.setInstructorWorkingDay(this);
        return this;
    }

    public InstructorWorkingDay removeBoundingSchedule(BoundingSchedule boundingSchedule) {
        this.boundingSchedules.remove(boundingSchedule);
        boundingSchedule.setInstructorWorkingDay(null);
        return this;
    }

    public Set<WorkingDay> getWorkingDays() {
        return this.workingDays;
    }

    public void setWorkingDays(Set<WorkingDay> workingDays) {
        if (this.workingDays != null) {
            this.workingDays.forEach(i -> i.setInstructorWorkingDay(null));
        }
        if (workingDays != null) {
            workingDays.forEach(i -> i.setInstructorWorkingDay(this));
        }
        this.workingDays = workingDays;
    }

    public InstructorWorkingDay workingDays(Set<WorkingDay> workingDays) {
        this.setWorkingDays(workingDays);
        return this;
    }

    public InstructorWorkingDay addWorkingDay(WorkingDay workingDay) {
        this.workingDays.add(workingDay);
        workingDay.setInstructorWorkingDay(this);
        return this;
    }

    public InstructorWorkingDay removeWorkingDay(WorkingDay workingDay) {
        this.workingDays.remove(workingDay);
        workingDay.setInstructorWorkingDay(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InstructorWorkingDay)) {
            return false;
        }
        return getId() != null && getId().equals(((InstructorWorkingDay) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InstructorWorkingDay{" +
            "id=" + getId() +
            ", nameWorkingDay='" + getNameWorkingDay() + "'" +
            ", descriptionWorkingDay='" + getDescriptionWorkingDay() + "'" +
            ", workingDayState='" + getWorkingDayState() + "'" +
            "}";
    }
}
