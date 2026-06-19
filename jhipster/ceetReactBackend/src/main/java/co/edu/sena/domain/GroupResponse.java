package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A GroupResponse.
 */
@Document(collection = "group_response")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GroupResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("evaluation_date")
    private ZonedDateTime evaluationDate;

    @DBRef
    @Field("observationResponse")
    @JsonIgnoreProperties(value = { "groupResponse", "customer" }, allowSetters = true)
    private Set<ObservationResponse> observationResponses = new HashSet<>();

    @DBRef
    @Field("projectGroup")
    @JsonIgnoreProperties(value = { "generalObservations", "memberGroups", "groupResponses", "course" }, allowSetters = true)
    private ProjectGroup projectGroup;

    @DBRef
    @Field("assessment")
    @JsonIgnoreProperties(value = { "groupResponses" }, allowSetters = true)
    private Assessment assessment;

    @DBRef
    @Field("itemList")
    @JsonIgnoreProperties(value = { "groupResponses", "checkList", "learningResult" }, allowSetters = true)
    private ItemList itemList;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public GroupResponse id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getEvaluationDate() {
        return this.evaluationDate;
    }

    public GroupResponse evaluationDate(ZonedDateTime evaluationDate) {
        this.setEvaluationDate(evaluationDate);
        return this;
    }

    public void setEvaluationDate(ZonedDateTime evaluationDate) {
        this.evaluationDate = evaluationDate;
    }

    public Set<ObservationResponse> getObservationResponses() {
        return this.observationResponses;
    }

    public void setObservationResponses(Set<ObservationResponse> observationResponses) {
        if (this.observationResponses != null) {
            this.observationResponses.forEach(i -> i.setGroupResponse(null));
        }
        if (observationResponses != null) {
            observationResponses.forEach(i -> i.setGroupResponse(this));
        }
        this.observationResponses = observationResponses;
    }

    public GroupResponse observationResponses(Set<ObservationResponse> observationResponses) {
        this.setObservationResponses(observationResponses);
        return this;
    }

    public GroupResponse addObservationResponse(ObservationResponse observationResponse) {
        this.observationResponses.add(observationResponse);
        observationResponse.setGroupResponse(this);
        return this;
    }

    public GroupResponse removeObservationResponse(ObservationResponse observationResponse) {
        this.observationResponses.remove(observationResponse);
        observationResponse.setGroupResponse(null);
        return this;
    }

    public ProjectGroup getProjectGroup() {
        return this.projectGroup;
    }

    public void setProjectGroup(ProjectGroup projectGroup) {
        this.projectGroup = projectGroup;
    }

    public GroupResponse projectGroup(ProjectGroup projectGroup) {
        this.setProjectGroup(projectGroup);
        return this;
    }

    public Assessment getAssessment() {
        return this.assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public GroupResponse assessment(Assessment assessment) {
        this.setAssessment(assessment);
        return this;
    }

    public ItemList getItemList() {
        return this.itemList;
    }

    public void setItemList(ItemList itemList) {
        this.itemList = itemList;
    }

    public GroupResponse itemList(ItemList itemList) {
        this.setItemList(itemList);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupResponse)) {
            return false;
        }
        return getId() != null && getId().equals(((GroupResponse) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GroupResponse{" +
            "id=" + getId() +
            ", evaluationDate='" + getEvaluationDate() + "'" +
            "}";
    }
}
