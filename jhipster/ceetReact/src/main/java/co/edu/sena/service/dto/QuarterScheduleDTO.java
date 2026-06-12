package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.QuarterSchedule} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuarterScheduleDTO implements Serializable {

    private String id;

    @NotNull
    private LearningResultDTO learningResult;

    @NotNull
    private PlanningDTO planning;

    @NotNull
    private TrimesterDTO trimester;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LearningResultDTO getLearningResult() {
        return learningResult;
    }

    public void setLearningResult(LearningResultDTO learningResult) {
        this.learningResult = learningResult;
    }

    public PlanningDTO getPlanning() {
        return planning;
    }

    public void setPlanning(PlanningDTO planning) {
        this.planning = planning;
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
        if (!(o instanceof QuarterScheduleDTO)) {
            return false;
        }

        QuarterScheduleDTO quarterScheduleDTO = (QuarterScheduleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, quarterScheduleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuarterScheduleDTO{" +
            "id='" + getId() + "'" +
            ", learningResult=" + getLearningResult() +
            ", planning=" + getPlanning() +
            ", trimester=" + getTrimester() +
            "}";
    }
}
