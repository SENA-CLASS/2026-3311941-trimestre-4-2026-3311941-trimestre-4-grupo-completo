package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.StateProgram;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.TrainingProgram} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TrainingProgramDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 50)
    private String programCode;

    @NotNull
    @Size(max = 40)
    private String programVersion;

    @NotNull
    @Size(max = 500)
    private String programName;

    @NotNull
    @Size(max = 40)
    private String programInitials;

    @NotNull
    private StateProgram programState;

    @NotNull
    private LevelEducationDTO levelEducation;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProgramCode() {
        return programCode;
    }

    public void setProgramCode(String programCode) {
        this.programCode = programCode;
    }

    public String getProgramVersion() {
        return programVersion;
    }

    public void setProgramVersion(String programVersion) {
        this.programVersion = programVersion;
    }

    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getProgramInitials() {
        return programInitials;
    }

    public void setProgramInitials(String programInitials) {
        this.programInitials = programInitials;
    }

    public StateProgram getProgramState() {
        return programState;
    }

    public void setProgramState(StateProgram programState) {
        this.programState = programState;
    }

    public LevelEducationDTO getLevelEducation() {
        return levelEducation;
    }

    public void setLevelEducation(LevelEducationDTO levelEducation) {
        this.levelEducation = levelEducation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrainingProgramDTO)) {
            return false;
        }

        TrainingProgramDTO trainingProgramDTO = (TrainingProgramDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, trainingProgramDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrainingProgramDTO{" +
            "id='" + getId() + "'" +
            ", programCode='" + getProgramCode() + "'" +
            ", programVersion='" + getProgramVersion() + "'" +
            ", programName='" + getProgramName() + "'" +
            ", programInitials='" + getProgramInitials() + "'" +
            ", programState='" + getProgramState() + "'" +
            ", levelEducation=" + getLevelEducation() +
            "}";
    }
}
