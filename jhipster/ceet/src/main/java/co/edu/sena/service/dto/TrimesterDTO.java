package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Trimester} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TrimesterDTO implements Serializable {

    private String id;

    @NotNull
    private Integer trimesterName;

    private String trimesterState;

    @NotNull
    private WorkingDayCourseDTO workingDayCourse;

    @NotNull
    private LevelEducationDTO levelEducations;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getTrimesterName() {
        return trimesterName;
    }

    public void setTrimesterName(Integer trimesterName) {
        this.trimesterName = trimesterName;
    }

    public String getTrimesterState() {
        return trimesterState;
    }

    public void setTrimesterState(String trimesterState) {
        this.trimesterState = trimesterState;
    }

    public WorkingDayCourseDTO getWorkingDayCourse() {
        return workingDayCourse;
    }

    public void setWorkingDayCourse(WorkingDayCourseDTO workingDayCourse) {
        this.workingDayCourse = workingDayCourse;
    }

    public LevelEducationDTO getLevelEducations() {
        return levelEducations;
    }

    public void setLevelEducations(LevelEducationDTO levelEducations) {
        this.levelEducations = levelEducations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrimesterDTO)) {
            return false;
        }

        TrimesterDTO trimesterDTO = (TrimesterDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, trimesterDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrimesterDTO{" +
            "id='" + getId() + "'" +
            ", trimesterName=" + getTrimesterName() +
            ", trimesterState='" + getTrimesterState() + "'" +
            ", workingDayCourse=" + getWorkingDayCourse() +
            ", levelEducations=" + getLevelEducations() +
            "}";
    }
}
