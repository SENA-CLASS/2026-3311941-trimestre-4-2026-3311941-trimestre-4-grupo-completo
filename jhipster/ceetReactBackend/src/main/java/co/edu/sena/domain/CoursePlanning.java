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
 * A CoursePlanning.
 */
@Document(collection = "course_planning")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CoursePlanning implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("state_course_planning")
    private State stateCoursePlanning;

    @DBRef
    @Field("course")
    @JsonIgnoreProperties(
        value = {
            "apprentices",
            "courseTrimesters",
            "coursePlannings",
            "projectGroups",
            "checkListCourses",
            "courseStatus",
            "workingDayCourse",
            "trainingProgram",
        },
        allowSetters = true
    )
    private Course course;

    @DBRef
    @Field("planning")
    @JsonIgnoreProperties(value = { "coursePlannings", "viewedResults", "quarterSchedules" }, allowSetters = true)
    private Planning planning;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CoursePlanning id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getStateCoursePlanning() {
        return this.stateCoursePlanning;
    }

    public CoursePlanning stateCoursePlanning(State stateCoursePlanning) {
        this.setStateCoursePlanning(stateCoursePlanning);
        return this;
    }

    public void setStateCoursePlanning(State stateCoursePlanning) {
        this.stateCoursePlanning = stateCoursePlanning;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public CoursePlanning course(Course course) {
        this.setCourse(course);
        return this;
    }

    public Planning getPlanning() {
        return this.planning;
    }

    public void setPlanning(Planning planning) {
        this.planning = planning;
    }

    public CoursePlanning planning(Planning planning) {
        this.setPlanning(planning);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CoursePlanning)) {
            return false;
        }
        return getId() != null && getId().equals(((CoursePlanning) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CoursePlanning{" +
            "id=" + getId() +
            ", stateCoursePlanning='" + getStateCoursePlanning() + "'" +
            "}";
    }
}
