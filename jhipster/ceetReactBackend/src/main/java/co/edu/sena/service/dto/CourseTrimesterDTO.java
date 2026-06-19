package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.CourseTrimester} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseTrimesterDTO implements Serializable {

    private String id;

    @NotNull
    private CourseDTO course;

    @NotNull
    private TrimesterDTO trimester;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public TrimesterDTO getTrimester() {
        return trimester;
    }

    public void setTrimester(TrimesterDTO trimester) {
        this.trimester = trimester;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourseTrimesterDTO)) {
            return false;
        }

        CourseTrimesterDTO courseTrimesterDTO = (CourseTrimesterDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, courseTrimesterDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseTrimesterDTO{" +
            "id='" + getId() + "'" +
            ", course=" + getCourse() +
            ", trimester=" + getTrimester() +
            "}";
    }
}
