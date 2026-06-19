package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ItemList} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ItemListDTO implements Serializable {

    private String id;

    @NotNull
    private Integer itemNumber;

    @NotNull
    @Size(max = 1000)
    private String question;

    @NotNull
    private CheckListDTO checkList;

    @NotNull
    private LearningResultDTO learningResult;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(Integer itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public CheckListDTO getCheckList() {
        return checkList;
    }

    public void setCheckList(CheckListDTO checkList) {
        this.checkList = checkList;
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
        if (!(o instanceof ItemListDTO)) {
            return false;
        }

        ItemListDTO itemListDTO = (ItemListDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, itemListDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemListDTO{" +
            "id='" + getId() + "'" +
            ", itemNumber=" + getItemNumber() +
            ", question='" + getQuestion() + "'" +
            ", checkList=" + getCheckList() +
            ", learningResult=" + getLearningResult() +
            "}";
    }
}
