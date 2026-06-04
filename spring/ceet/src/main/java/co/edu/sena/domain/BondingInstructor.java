package co.edu.sena.domain;

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
 * A BondingInstructor.
 */
@Document(collection = "bonding_instructor")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BondingInstructor implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("start_time")
    private LocalDate startTime;

    @NotNull
    @Field("end_time")
    private LocalDate endTime;

    @DBRef
    @Field("boundingSchedule")
    @JsonIgnoreProperties(value = { "bondingInstructor", "instructorWorkingDay" }, allowSetters = true)
    private Set<BoundingSchedule> boundingSchedules = new HashSet<>();

    @DBRef
    @Field("bondingCompetence")
    @JsonIgnoreProperties(value = { "bondingInstructor", "learningCompetence" }, allowSetters = true)
    private Set<BondingCompetence> bondingCompetences = new HashSet<>();

    @DBRef
    @Field("year")
    @JsonIgnoreProperties(value = { "bondingInstructors", "currentQuarters" }, allowSetters = true)
    private Year year;

    @DBRef
    @Field("instructor")
    @JsonIgnoreProperties(value = { "areaInstructors", "bondingInstructors", "schedules", "customer" }, allowSetters = true)
    private Instructor instructor;

    @DBRef
    @Field("bonding")
    @JsonIgnoreProperties(value = { "bondingInstructors" }, allowSetters = true)
    private Bonding bonding;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public BondingInstructor id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getStartTime() {
        return this.startTime;
    }

    public BondingInstructor startTime(LocalDate startTime) {
        this.setStartTime(startTime);
        return this;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return this.endTime;
    }

    public BondingInstructor endTime(LocalDate endTime) {
        this.setEndTime(endTime);
        return this;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public Set<BoundingSchedule> getBoundingSchedules() {
        return this.boundingSchedules;
    }

    public void setBoundingSchedules(Set<BoundingSchedule> boundingSchedules) {
        if (this.boundingSchedules != null) {
            this.boundingSchedules.forEach(i -> i.setBondingInstructor(null));
        }
        if (boundingSchedules != null) {
            boundingSchedules.forEach(i -> i.setBondingInstructor(this));
        }
        this.boundingSchedules = boundingSchedules;
    }

    public BondingInstructor boundingSchedules(Set<BoundingSchedule> boundingSchedules) {
        this.setBoundingSchedules(boundingSchedules);
        return this;
    }

    public BondingInstructor addBoundingSchedule(BoundingSchedule boundingSchedule) {
        this.boundingSchedules.add(boundingSchedule);
        boundingSchedule.setBondingInstructor(this);
        return this;
    }

    public BondingInstructor removeBoundingSchedule(BoundingSchedule boundingSchedule) {
        this.boundingSchedules.remove(boundingSchedule);
        boundingSchedule.setBondingInstructor(null);
        return this;
    }

    public Set<BondingCompetence> getBondingCompetences() {
        return this.bondingCompetences;
    }

    public void setBondingCompetences(Set<BondingCompetence> bondingCompetences) {
        if (this.bondingCompetences != null) {
            this.bondingCompetences.forEach(i -> i.setBondingInstructor(null));
        }
        if (bondingCompetences != null) {
            bondingCompetences.forEach(i -> i.setBondingInstructor(this));
        }
        this.bondingCompetences = bondingCompetences;
    }

    public BondingInstructor bondingCompetences(Set<BondingCompetence> bondingCompetences) {
        this.setBondingCompetences(bondingCompetences);
        return this;
    }

    public BondingInstructor addBondingCompetence(BondingCompetence bondingCompetence) {
        this.bondingCompetences.add(bondingCompetence);
        bondingCompetence.setBondingInstructor(this);
        return this;
    }

    public BondingInstructor removeBondingCompetence(BondingCompetence bondingCompetence) {
        this.bondingCompetences.remove(bondingCompetence);
        bondingCompetence.setBondingInstructor(null);
        return this;
    }

    public Year getYear() {
        return this.year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public BondingInstructor year(Year year) {
        this.setYear(year);
        return this;
    }

    public Instructor getInstructor() {
        return this.instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public BondingInstructor instructor(Instructor instructor) {
        this.setInstructor(instructor);
        return this;
    }

    public Bonding getBonding() {
        return this.bonding;
    }

    public void setBonding(Bonding bonding) {
        this.bonding = bonding;
    }

    public BondingInstructor bonding(Bonding bonding) {
        this.setBonding(bonding);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BondingInstructor)) {
            return false;
        }
        return getId() != null && getId().equals(((BondingInstructor) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BondingInstructor{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }
}
