package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ViewedResult} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ViewedResultDTO implements Serializable {

    private String id;

    @NotNull
    private CourseTrimesterDTO courseTrimester;

    @NotNull
    private PlanningDTO planning;

    @NotNull
    private LearningResultDTO learningResult;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CourseTrimesterDTO getCourseTrimester() {
        return courseTrimester;
    }

    public void setCourseTrimester(CourseTrimesterDTO courseTrimester) {
        this.courseTrimester = courseTrimester;
    }

    public PlanningDTO getPlanning() {
        return planning;
    }

    public void setPlanning(PlanningDTO planning) {
        this.planning = planning;
    }

    public LearningResultDTO getLearningResult() {
        return learningResult;
    }

    public void setLearningResult(LearningResultDTO learningResult) {
        this.learningResult = learningResult;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ViewedResultDTO)) {
            return false;
        }

        ViewedResultDTO viewedResultDTO = (ViewedResultDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, viewedResultDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ViewedResultDTO{" +
            "id='" + getId() + "'" +
            ", courseTrimester=" + getCourseTrimester() +
            ", planning=" + getPlanning() +
            ", learningResult=" + getLearningResult() +
            "}";
    }
}
