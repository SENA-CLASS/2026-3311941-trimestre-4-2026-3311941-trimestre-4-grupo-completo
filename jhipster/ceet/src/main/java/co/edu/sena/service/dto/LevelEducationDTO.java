package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.LevelEducation} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LevelEducationDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 40)
    private String levelName;

    @NotNull
    private State stateLevelEducation;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public State getStateLevelEducation() {
        return stateLevelEducation;
    }

    public void setStateLevelEducation(State stateLevelEducation) {
        this.stateLevelEducation = stateLevelEducation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LevelEducationDTO)) {
            return false;
        }

        LevelEducationDTO levelEducationDTO = (LevelEducationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, levelEducationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LevelEducationDTO{" +
            "id='" + getId() + "'" +
            ", levelName='" + getLevelName() + "'" +
            ", stateLevelEducation='" + getStateLevelEducation() + "'" +
            "}";
    }
}
