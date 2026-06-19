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
 * A Instructor.
 */
@Document(collection = "instructor")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Instructor implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("instructor_state")
    private State instructorState;

    @DBRef
    @Field("areaInstructor")
    @JsonIgnoreProperties(value = { "area", "instructor" }, allowSetters = true)
    private Set<AreaInstructor> areaInstructors = new HashSet<>();

    @DBRef
    @Field("bondingInstructor")
    @JsonIgnoreProperties(value = { "boundingSchedules", "bondingCompetences", "year", "instructor", "bonding" }, allowSetters = true)
    private Set<BondingInstructor> bondingInstructors = new HashSet<>();

    @DBRef
    @Field("schedule")
    @JsonIgnoreProperties(
        value = { "scheduleVersion", "modality", "day", "courseTrimester", "classroom", "instructor" },
        allowSetters = true
    )
    private Set<Schedule> schedules = new HashSet<>();

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties(
        value = {
            "user",
            "apprentices",
            "logErrors",
            "logAudits",
            "generalObservations",
            "observationResponses",
            "instructors",
            "documentType",
        },
        allowSetters = true
    )
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Instructor id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getInstructorState() {
        return this.instructorState;
    }

    public Instructor instructorState(State instructorState) {
        this.setInstructorState(instructorState);
        return this;
    }

    public void setInstructorState(State instructorState) {
        this.instructorState = instructorState;
    }

    public Set<AreaInstructor> getAreaInstructors() {
        return this.areaInstructors;
    }

    public void setAreaInstructors(Set<AreaInstructor> areaInstructors) {
        if (this.areaInstructors != null) {
            this.areaInstructors.forEach(i -> i.setInstructor(null));
        }
        if (areaInstructors != null) {
            areaInstructors.forEach(i -> i.setInstructor(this));
        }
        this.areaInstructors = areaInstructors;
    }

    public Instructor areaInstructors(Set<AreaInstructor> areaInstructors) {
        this.setAreaInstructors(areaInstructors);
        return this;
    }

    public Instructor addAreaInstructor(AreaInstructor areaInstructor) {
        this.areaInstructors.add(areaInstructor);
        areaInstructor.setInstructor(this);
        return this;
    }

    public Instructor removeAreaInstructor(AreaInstructor areaInstructor) {
        this.areaInstructors.remove(areaInstructor);
        areaInstructor.setInstructor(null);
        return this;
    }

    public Set<BondingInstructor> getBondingInstructors() {
        return this.bondingInstructors;
    }

    public void setBondingInstructors(Set<BondingInstructor> bondingInstructors) {
        if (this.bondingInstructors != null) {
            this.bondingInstructors.forEach(i -> i.setInstructor(null));
        }
        if (bondingInstructors != null) {
            bondingInstructors.forEach(i -> i.setInstructor(this));
        }
        this.bondingInstructors = bondingInstructors;
    }

    public Instructor bondingInstructors(Set<BondingInstructor> bondingInstructors) {
        this.setBondingInstructors(bondingInstructors);
        return this;
    }

    public Instructor addBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructors.add(bondingInstructor);
        bondingInstructor.setInstructor(this);
        return this;
    }

    public Instructor removeBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructors.remove(bondingInstructor);
        bondingInstructor.setInstructor(null);
        return this;
    }

    public Set<Schedule> getSchedules() {
        return this.schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        if (this.schedules != null) {
            this.schedules.forEach(i -> i.setInstructor(null));
        }
        if (schedules != null) {
            schedules.forEach(i -> i.setInstructor(this));
        }
        this.schedules = schedules;
    }

    public Instructor schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public Instructor addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setInstructor(this);
        return this;
    }

    public Instructor removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setInstructor(null);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Instructor customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instructor)) {
            return false;
        }
        return getId() != null && getId().equals(((Instructor) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Instructor{" +
            "id=" + getId() +
            ", instructorState='" + getInstructorState() + "'" +
            "}";
    }
}
