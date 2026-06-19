package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ClassroomLimitation} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClassroomLimitationDTO implements Serializable {

    private String id;

    @NotNull
    private ClassroomDTO classroom;

    @NotNull
    private LearningResultDTO learningResult;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ClassroomDTO getClassroom() {
        return classroom;
    }

    public void setClassroom(ClassroomDTO classroom) {
        this.classroom = classroom;
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
        if (!(o instanceof ClassroomLimitationDTO)) {
            return false;
        }

        ClassroomLimitationDTO classroomLimitationDTO = (ClassroomLimitationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, classroomLimitationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClassroomLimitationDTO{" +
            "id='" + getId() + "'" +
            ", classroom=" + getClassroom() +
            ", learningResult=" + getLearningResult() +
            "}";
    }
}
