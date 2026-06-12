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
 * A Campus.
 */
@Document(collection = "campus")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Campus implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("campus_name")
    private String campusName;

    @NotNull
    @Size(max = 400)
    @Field("campus_address")
    private String campusAddress;

    @NotNull
    @Field("campus_state")
    private State campusState;

    @DBRef
    @Field("classroom")
    @JsonIgnoreProperties(value = { "classroomLimitations", "schedules", "classroomType", "campus" }, allowSetters = true)
    private Set<Classroom> classrooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Campus id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampusName() {
        return this.campusName;
    }

    public Campus campusName(String campusName) {
        this.setCampusName(campusName);
        return this;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public String getCampusAddress() {
        return this.campusAddress;
    }

    public Campus campusAddress(String campusAddress) {
        this.setCampusAddress(campusAddress);
        return this;
    }

    public void setCampusAddress(String campusAddress) {
        this.campusAddress = campusAddress;
    }

    public State getCampusState() {
        return this.campusState;
    }

    public Campus campusState(State campusState) {
        this.setCampusState(campusState);
        return this;
    }

    public void setCampusState(State campusState) {
        this.campusState = campusState;
    }

    public Set<Classroom> getClassrooms() {
        return this.classrooms;
    }

    public void setClassrooms(Set<Classroom> classrooms) {
        if (this.classrooms != null) {
            this.classrooms.forEach(i -> i.setCampus(null));
        }
        if (classrooms != null) {
            classrooms.forEach(i -> i.setCampus(this));
        }
        this.classrooms = classrooms;
    }

    public Campus classrooms(Set<Classroom> classrooms) {
        this.setClassrooms(classrooms);
        return this;
    }

    public Campus addClassroom(Classroom classroom) {
        this.classrooms.add(classroom);
        classroom.setCampus(this);
        return this;
    }

    public Campus removeClassroom(Classroom classroom) {
        this.classrooms.remove(classroom);
        classroom.setCampus(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Campus)) {
            return false;
        }
        return getId() != null && getId().equals(((Campus) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Campus{" +
            "id=" + getId() +
            ", campusName='" + getCampusName() + "'" +
            ", campusAddress='" + getCampusAddress() + "'" +
            ", campusState='" + getCampusState() + "'" +
            "}";
    }
}
