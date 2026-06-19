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
 * A PlanningActivity.
 */
@Document(collection = "planning_activity")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanningActivity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("quarterSchedule")
    @JsonIgnoreProperties(value = { "planningActivities", "learningResult", "planning", "trimester" }, allowSetters = true)
    private QuarterSchedule quarterSchedule;

    @DBRef
    @Field("projectActivity")
    @JsonIgnoreProperties(value = { "planningActivities", "projectPhase" }, allowSetters = true)
    private ProjectActivity projectActivity;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public PlanningActivity id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public QuarterSchedule getQuarterSchedule() {
        return this.quarterSchedule;
    }

    public void setQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedule = quarterSchedule;
    }

    public PlanningActivity quarterSchedule(QuarterSchedule quarterSchedule) {
        this.setQuarterSchedule(quarterSchedule);
        return this;
    }

    public ProjectActivity getProjectActivity() {
        return this.projectActivity;
    }

    public void setProjectActivity(ProjectActivity projectActivity) {
        this.projectActivity = projectActivity;
    }

    public PlanningActivity projectActivity(ProjectActivity projectActivity) {
        this.setProjectActivity(projectActivity);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanningActivity)) {
            return false;
        }
        return getId() != null && getId().equals(((PlanningActivity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanningActivity{" +
            "id=" + getId() +
            "}";
    }
}
