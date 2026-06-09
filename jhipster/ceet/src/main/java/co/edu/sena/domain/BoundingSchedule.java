package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A BoundingSchedule.
 */
@Document(collection = "bounding_schedule")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BoundingSchedule implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("bondingInstructor")
    @JsonIgnoreProperties(value = { "boundingSchedules", "bondingCompetences", "year", "instructor", "bonding" }, allowSetters = true)
    private BondingInstructor bondingInstructor;

    @DBRef
    @Field("instructorWorkingDay")
    @JsonIgnoreProperties(value = { "boundingSchedules", "workingDays" }, allowSetters = true)
    private InstructorWorkingDay instructorWorkingDay;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public BoundingSchedule id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BondingInstructor getBondingInstructor() {
        return this.bondingInstructor;
    }

    public void setBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructor = bondingInstructor;
    }

    public BoundingSchedule bondingInstructor(BondingInstructor bondingInstructor) {
        this.setBondingInstructor(bondingInstructor);
        return this;
    }

    public InstructorWorkingDay getInstructorWorkingDay() {
        return this.instructorWorkingDay;
    }

    public void setInstructorWorkingDay(InstructorWorkingDay instructorWorkingDay) {
        this.instructorWorkingDay = instructorWorkingDay;
    }

    public BoundingSchedule instructorWorkingDay(InstructorWorkingDay instructorWorkingDay) {
        this.setInstructorWorkingDay(instructorWorkingDay);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BoundingSchedule)) {
            return false;
        }
        return getId() != null && getId().equals(((BoundingSchedule) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BoundingSchedule{" +
            "id=" + getId() +
            "}";
    }
}
