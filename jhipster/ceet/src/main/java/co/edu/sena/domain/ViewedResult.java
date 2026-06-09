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
 * A ViewedResult.
 */
@Document(collection = "viewed_result")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ViewedResult implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("courseTrimester")
    @JsonIgnoreProperties(value = { "viewedResults", "schedules", "course", "trimester" }, allowSetters = true)
    private CourseTrimester courseTrimester;

    @DBRef
    @Field("planning")
    @JsonIgnoreProperties(value = { "coursePlannings", "viewedResults", "quarterSchedules" }, allowSetters = true)
    private Planning planning;

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

    public ViewedResult id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CourseTrimester getCourseTrimester() {
        return this.courseTrimester;
    }

    public void setCourseTrimester(CourseTrimester courseTrimester) {
        this.courseTrimester = courseTrimester;
    }

    public ViewedResult courseTrimester(CourseTrimester courseTrimester) {
        this.setCourseTrimester(courseTrimester);
        return this;
    }

    public Planning getPlanning() {
        return this.planning;
    }

    public void setPlanning(Planning planning) {
        this.planning = planning;
    }

    public ViewedResult planning(Planning planning) {
        this.setPlanning(planning);
        return this;
    }

    public LearningResult getLearningResult() {
        return this.learningResult;
    }

    public void setLearningResult(LearningResult learningResult) {
        this.learningResult = learningResult;
    }

    public ViewedResult learningResult(LearningResult learningResult) {
        this.setLearningResult(learningResult);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ViewedResult)) {
            return false;
        }
        return getId() != null && getId().equals(((ViewedResult) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ViewedResult{" +
            "id=" + getId() +
            "}";
    }
}
