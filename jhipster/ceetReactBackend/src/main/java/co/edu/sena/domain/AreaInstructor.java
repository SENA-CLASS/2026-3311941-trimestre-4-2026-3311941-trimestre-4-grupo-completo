package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A AreaInstructor.
 */
@Document(collection = "area_instructor")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AreaInstructor implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("area_instructor_state")
    private State areaInstructorState;

    @DBRef
    @Field("area")
    @JsonIgnoreProperties(value = { "areaInstructors" }, allowSetters = true)
    private Area area;

    @DBRef
    @Field("instructor")
    @JsonIgnoreProperties(value = { "areaInstructors", "bondingInstructors", "schedules", "customer" }, allowSetters = true)
    private Instructor instructor;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public AreaInstructor id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getAreaInstructorState() {
        return this.areaInstructorState;
    }

    public AreaInstructor areaInstructorState(State areaInstructorState) {
        this.setAreaInstructorState(areaInstructorState);
        return this;
    }

    public void setAreaInstructorState(State areaInstructorState) {
        this.areaInstructorState = areaInstructorState;
    }

    public Area getArea() {
        return this.area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public AreaInstructor area(Area area) {
        this.setArea(area);
        return this;
    }

    public Instructor getInstructor() {
        return this.instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public AreaInstructor instructor(Instructor instructor) {
        this.setInstructor(instructor);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AreaInstructor)) {
            return false;
        }
        return getId() != null && getId().equals(((AreaInstructor) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AreaInstructor{" +
            "id=" + getId() +
            ", areaInstructorState='" + getAreaInstructorState() + "'" +
            "}";
    }
}
