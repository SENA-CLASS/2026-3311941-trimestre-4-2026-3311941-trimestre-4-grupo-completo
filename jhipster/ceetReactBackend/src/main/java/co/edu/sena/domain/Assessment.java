package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Assessment.
 */
@Document(collection = "assessment")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Assessment implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("assessment_type")
    private String assessmentType;

    @NotNull
    @Field("assessment_state")
    private State assessmentState;

    @DBRef
    @Field("groupResponse")
    @JsonIgnoreProperties(value = { "observationResponses", "projectGroup", "assessment", "itemList" }, allowSetters = true)
    private Set<GroupResponse> groupResponses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Assessment id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAssessmentType() {
        return this.assessmentType;
    }

    public Assessment assessmentType(String assessmentType) {
        this.setAssessmentType(assessmentType);
        return this;
    }

    public void setAssessmentType(String assessmentType) {
        this.assessmentType = assessmentType;
    }

    public State getAssessmentState() {
        return this.assessmentState;
    }

    public Assessment assessmentState(State assessmentState) {
        this.setAssessmentState(assessmentState);
        return this;
    }

    public void setAssessmentState(State assessmentState) {
        this.assessmentState = assessmentState;
    }

    public Set<GroupResponse> getGroupResponses() {
        return this.groupResponses;
    }

    public void setGroupResponses(Set<GroupResponse> groupResponses) {
        if (this.groupResponses != null) {
            this.groupResponses.forEach(i -> i.setAssessment(null));
        }
        if (groupResponses != null) {
            groupResponses.forEach(i -> i.setAssessment(this));
        }
        this.groupResponses = groupResponses;
    }

    public Assessment groupResponses(Set<GroupResponse> groupResponses) {
        this.setGroupResponses(groupResponses);
        return this;
    }

    public Assessment addGroupResponse(GroupResponse groupResponse) {
        this.groupResponses.add(groupResponse);
        groupResponse.setAssessment(this);
        return this;
    }

    public Assessment removeGroupResponse(GroupResponse groupResponse) {
        this.groupResponses.remove(groupResponse);
        groupResponse.setAssessment(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Assessment)) {
            return false;
        }
        return getId() != null && getId().equals(((Assessment) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Assessment{" +
            "id=" + getId() +
            ", assessmentType='" + getAssessmentType() + "'" +
            ", assessmentState='" + getAssessmentState() + "'" +
            "}";
    }
}
