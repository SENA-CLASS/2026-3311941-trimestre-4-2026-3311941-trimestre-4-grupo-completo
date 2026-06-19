package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.CoursePlanning} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CoursePlanningDTO implements Serializable {

    private String id;

    @NotNull
    private State stateCoursePlanning;

    @NotNull
    private CourseDTO course;

    @NotNull
    private PlanningDTO planning;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getStateCoursePlanning() {
        return stateCoursePlanning;
    }

    public void setStateCoursePlanning(State stateCoursePlanning) {
        this.stateCoursePlanning = stateCoursePlanning;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public PlanningDTO getPlanning() {
        return planning;
    }

    public void setPlanning(PlanningDTO planning) {
        this.planning = planning;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CoursePlanningDTO)) {
            return false;
        }

        CoursePlanningDTO coursePlanningDTO = (CoursePlanningDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, coursePlanningDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CoursePlanningDTO{" +
            "id='" + getId() + "'" +
            ", stateCoursePlanning='" + getStateCoursePlanning() + "'" +
            ", course=" + getCourse() +
            ", planning=" + getPlanning() +
            "}";
    }
}
