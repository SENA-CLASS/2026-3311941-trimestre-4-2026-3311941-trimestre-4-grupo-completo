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
 * A ClassroomType.
 */
@Document(collection = "classroom_type")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClassroomType implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("type_classroom")
    private String typeClassroom;

    @NotNull
    @Size(max = 100)
    @Field("classroom_description")
    private String classroomDescription;

    @NotNull
    @Field("classroom_state")
    private State classroomState;

    @DBRef
    @Field("classroom")
    @JsonIgnoreProperties(value = { "classroomLimitations", "schedules", "classroomType", "campus" }, allowSetters = true)
    private Set<Classroom> classrooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ClassroomType id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTypeClassroom() {
        return this.typeClassroom;
    }

    public ClassroomType typeClassroom(String typeClassroom) {
        this.setTypeClassroom(typeClassroom);
        return this;
    }

    public void setTypeClassroom(String typeClassroom) {
        this.typeClassroom = typeClassroom;
    }

    public String getClassroomDescription() {
        return this.classroomDescription;
    }

    public ClassroomType classroomDescription(String classroomDescription) {
        this.setClassroomDescription(classroomDescription);
        return this;
    }

    public void setClassroomDescription(String classroomDescription) {
        this.classroomDescription = classroomDescription;
    }

    public State getClassroomState() {
        return this.classroomState;
    }

    public ClassroomType classroomState(State classroomState) {
        this.setClassroomState(classroomState);
        return this;
    }

    public void setClassroomState(State classroomState) {
        this.classroomState = classroomState;
    }

    public Set<Classroom> getClassrooms() {
        return this.classrooms;
    }

    public void setClassrooms(Set<Classroom> classrooms) {
        if (this.classrooms != null) {
            this.classrooms.forEach(i -> i.setClassroomType(null));
        }
        if (classrooms != null) {
            classrooms.forEach(i -> i.setClassroomType(this));
        }
        this.classrooms = classrooms;
    }

    public ClassroomType classrooms(Set<Classroom> classrooms) {
        this.setClassrooms(classrooms);
        return this;
    }

    public ClassroomType addClassroom(Classroom classroom) {
        this.classrooms.add(classroom);
        classroom.setClassroomType(this);
        return this;
    }

    public ClassroomType removeClassroom(Classroom classroom) {
        this.classrooms.remove(classroom);
        classroom.setClassroomType(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClassroomType)) {
            return false;
        }
        return getId() != null && getId().equals(((ClassroomType) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClassroomType{" +
            "id=" + getId() +
            ", typeClassroom='" + getTypeClassroom() + "'" +
            ", classroomDescription='" + getClassroomDescription() + "'" +
            ", classroomState='" + getClassroomState() + "'" +
            "}";
    }
}
