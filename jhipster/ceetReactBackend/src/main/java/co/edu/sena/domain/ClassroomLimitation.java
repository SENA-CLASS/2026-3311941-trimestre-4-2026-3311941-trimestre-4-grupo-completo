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
 * A ClassroomLimitation.
 */
@Document(collection = "classroom_limitation")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClassroomLimitation implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("classroom")
    @JsonIgnoreProperties(value = { "classroomLimitations", "schedules", "classroomType", "campus" }, allowSetters = true)
    private Classroom classroom;

    @DBRef
    @Field("learningResult")
    @JsonIgnoreProperties(
        value = { "quarterSchedules", "classroomLimitations", "itemLists", "viewedResults", "learningCompetence" },
        allowSetters = true
    )
    private LearningResult learningResult;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ClassroomLimitation id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Classroom getClassroom() {
        return this.classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public ClassroomLimitation classroom(Classroom classroom) {
        this.setClassroom(classroom);
        return this;
    }

    public LearningResult getLearningResult() {
        return this.learningResult;
    }

    public void setLearningResult(LearningResult learningResult) {
        this.learningResult = learningResult;
    }

    public ClassroomLimitation learningResult(LearningResult learningResult) {
        this.setLearningResult(learningResult);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClassroomLimitation)) {
            return false;
        }
        return getId() != null && getId().equals(((ClassroomLimitation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClassroomLimitation{" +
            "id=" + getId() +
            "}";
    }
}
