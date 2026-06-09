package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.LearningCompetence} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LearningCompetenceDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 50)
    private String competenceCode;

    @NotNull
    @Size(max = 1000)
    private String competitionDenomination;

    @NotNull
    private TrainingProgramDTO trainingProgram;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompetenceCode() {
        return competenceCode;
    }

    public void setCompetenceCode(String competenceCode) {
        this.competenceCode = competenceCode;
    }

    public String getCompetitionDenomination() {
        return competitionDenomination;
    }

    public void setCompetitionDenomination(String competitionDenomination) {
        this.competitionDenomination = competitionDenomination;
    }

    public TrainingProgramDTO getTrainingProgram() {
        return trainingProgram;
    }

    public void setTrainingProgram(TrainingProgramDTO trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningCompetenceDTO)) {
            return false;
        }

        LearningCompetenceDTO learningCompetenceDTO = (LearningCompetenceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, learningCompetenceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningCompetenceDTO{" +
            "id='" + getId() + "'" +
            ", competenceCode='" + getCompetenceCode() + "'" +
            ", competitionDenomination='" + getCompetitionDenomination() + "'" +
            ", trainingProgram=" + getTrainingProgram() +
            "}";
    }
}
