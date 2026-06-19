package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.LearningResult} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LearningResultDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 40)
    private String resultCode;

    @NotNull
    @Size(max = 1000)
    private String denomination;

    @NotNull
    private LearningCompetenceDTO learningCompetence;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getDenomination() {
        return denomination;
    }

    public void setDenomination(String denomination) {
        this.denomination = denomination;
    }

    public LearningCompetenceDTO getLearningCompetence() {
        return learningCompetence;
    }

    public void setLearningCompetence(LearningCompetenceDTO learningCompetence) {
        this.learningCompetence = learningCompetence;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningResultDTO)) {
            return false;
        }

        LearningResultDTO learningResultDTO = (LearningResultDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, learningResultDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningResultDTO{" +
            "id='" + getId() + "'" +
            ", resultCode='" + getResultCode() + "'" +
            ", denomination='" + getDenomination() + "'" +
            ", learningCompetence=" + getLearningCompetence() +
            "}";
    }
}
