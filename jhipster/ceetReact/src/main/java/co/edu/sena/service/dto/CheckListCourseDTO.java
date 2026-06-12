package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.CheckListCourse} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CheckListCourseDTO implements Serializable {

    private String id;

    @NotNull
    private State checkListState;

    @NotNull
    private CourseDTO course;

    @NotNull
    private CheckListDTO checkList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getCheckListState() {
        return checkListState;
    }

    public void setCheckListState(State checkListState) {
        this.checkListState = checkListState;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public CheckListDTO getCheckList() {
        return checkList;
    }

    public void setCheckList(CheckListDTO checkList) {
        this.checkList = checkList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CheckListCourseDTO)) {
            return false;
        }

        CheckListCourseDTO checkListCourseDTO = (CheckListCourseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, checkListCourseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CheckListCourseDTO{" +
            "id='" + getId() + "'" +
            ", checkListState='" + getCheckListState() + "'" +
            ", course=" + getCourse() +
            ", checkList=" + getCheckList() +
            "}";
    }
}
