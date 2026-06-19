package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.GroupResponse} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GroupResponseDTO implements Serializable {

    private String id;

    @NotNull
    private ZonedDateTime evaluationDate;

    @NotNull
    private ProjectGroupDTO projectGroup;

    @NotNull
    private AssessmentDTO assessment;

    @NotNull
    private ItemListDTO itemList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getEvaluationDate() {
        return evaluationDate;
    }

    public void setEvaluationDate(ZonedDateTime evaluationDate) {
        this.evaluationDate = evaluationDate;
    }

    public ProjectGroupDTO getProjectGroup() {
        return projectGroup;
    }

    public void setProjectGroup(ProjectGroupDTO projectGroup) {
        this.projectGroup = projectGroup;
    }

    public AssessmentDTO getAssessment() {
        return assessment;
    }

    public void setAssessment(AssessmentDTO assessment) {
        this.assessment = assessment;
    }

    public ItemListDTO getItemList() {
        return itemList;
    }

    public void setItemList(ItemListDTO itemList) {
        this.itemList = itemList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupResponseDTO)) {
            return false;
        }

        GroupResponseDTO groupResponseDTO = (GroupResponseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, groupResponseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GroupResponseDTO{" +
            "id='" + getId() + "'" +
            ", evaluationDate='" + getEvaluationDate() + "'" +
            ", projectGroup=" + getProjectGroup() +
            ", assessment=" + getAssessment() +
            ", itemList=" + getItemList() +
            "}";
    }
}
