package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A MemberGroup.
 */
@Document(collection = "member_group")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MemberGroup implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("projectGroup")
    @JsonIgnoreProperties(value = { "generalObservations", "memberGroups", "groupResponses", "course" }, allowSetters = true)
    private ProjectGroup projectGroup;

    @DBRef
    @Field("apprentice")
    @JsonIgnoreProperties(value = { "memberGroups", "customer", "trainingStatus", "course" }, allowSetters = true)
    private Apprentice apprentice;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public MemberGroup id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ProjectGroup getProjectGroup() {
        return this.projectGroup;
    }

    public void setProjectGroup(ProjectGroup projectGroup) {
        this.projectGroup = projectGroup;
    }

    public MemberGroup projectGroup(ProjectGroup projectGroup) {
        this.setProjectGroup(projectGroup);
        return this;
    }

    public Apprentice getApprentice() {
        return this.apprentice;
    }

    public void setApprentice(Apprentice apprentice) {
        this.apprentice = apprentice;
    }

    public MemberGroup apprentice(Apprentice apprentice) {
        this.setApprentice(apprentice);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberGroup)) {
            return false;
        }
        return getId() != null && getId().equals(((MemberGroup) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MemberGroup{" +
            "id=" + getId() +
            "}";
    }
}
