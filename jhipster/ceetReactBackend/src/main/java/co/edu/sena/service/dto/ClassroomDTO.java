package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.Limitation;
import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Classroom} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClassroomDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 50)
    private String classroomNumber;

    @NotNull
    @Size(max = 1000)
    private String classroomDescription;

    @NotNull
    private State classroomState;

    @NotNull
    private Limitation limitation;

    @NotNull
    private ClassroomTypeDTO classroomType;

    @NotNull
    private CampusDTO campus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClassroomNumber() {
        return classroomNumber;
    }

    public void setClassroomNumber(String classroomNumber) {
        this.classroomNumber = classroomNumber;
    }

    public String getClassroomDescription() {
        return classroomDescription;
    }

    public void setClassroomDescription(String classroomDescription) {
        this.classroomDescription = classroomDescription;
    }

    public State getClassroomState() {
        return classroomState;
    }

    public void setClassroomState(State classroomState) {
        this.classroomState = classroomState;
    }

    public Limitation getLimitation() {
        return limitation;
    }

    public void setLimitation(Limitation limitation) {
        this.limitation = limitation;
    }

    public ClassroomTypeDTO getClassroomType() {
        return classroomType;
    }

    public void setClassroomType(ClassroomTypeDTO classroomType) {
        this.classroomType = classroomType;
    }

    public CampusDTO getCampus() {
        return campus;
    }

    public void setCampus(CampusDTO campus) {
        this.campus = campus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClassroomDTO)) {
            return false;
        }

        ClassroomDTO classroomDTO = (ClassroomDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, classroomDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClassroomDTO{" +
            "id='" + getId() + "'" +
            ", classroomNumber='" + getClassroomNumber() + "'" +
            ", classroomDescription='" + getClassroomDescription() + "'" +
            ", classroomState='" + getClassroomState() + "'" +
            ", limitation='" + getLimitation() + "'" +
            ", classroomType=" + getClassroomType() +
            ", campus=" + getCampus() +
            "}";
    }
}
