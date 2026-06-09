package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.CheckList} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CheckListDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 50)
    private String listName;

    @NotNull
    private State listState;

    @NotNull
    private TrainingProgramDTO trainingProgram;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public State getListState() {
        return listState;
    }

    public void setListState(State listState) {
        this.listState = listState;
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
        if (!(o instanceof CheckListDTO)) {
            return false;
        }

        CheckListDTO checkListDTO = (CheckListDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, checkListDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CheckListDTO{" +
            "id='" + getId() + "'" +
            ", listName='" + getListName() + "'" +
            ", listState='" + getListState() + "'" +
            ", trainingProgram=" + getTrainingProgram() +
            "}";
    }
}
