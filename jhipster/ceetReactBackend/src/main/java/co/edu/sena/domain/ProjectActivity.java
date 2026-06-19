package co.edu.sena.domain;

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
 * A ProjectActivity.
 */
@Document(collection = "project_activity")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectActivity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("activity_number")
    private Integer activityNumber;

    @NotNull
    @Size(max = 400)
    @Field("activity_description")
    private String activityDescription;

    @NotNull
    @Size(max = 40)
    @Field("project_activity_state")
    private String projectActivityState;

    @DBRef
    @Field("planningActivity")
    @JsonIgnoreProperties(value = { "quarterSchedule", "projectActivity" }, allowSetters = true)
    private Set<PlanningActivity> planningActivities = new HashSet<>();

    @DBRef
    @Field("projectPhase")
    @JsonIgnoreProperties(value = { "projectActivities", "project" }, allowSetters = true)
    private ProjectPhase projectPhase;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ProjectActivity id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getActivityNumber() {
        return this.activityNumber;
    }

    public ProjectActivity activityNumber(Integer activityNumber) {
        this.setActivityNumber(activityNumber);
        return this;
    }

    public void setActivityNumber(Integer activityNumber) {
        this.activityNumber = activityNumber;
    }

    public String getActivityDescription() {
        return this.activityDescription;
    }

    public ProjectActivity activityDescription(String activityDescription) {
        this.setActivityDescription(activityDescription);
        return this;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public String getProjectActivityState() {
        return this.projectActivityState;
    }

    public ProjectActivity projectActivityState(String projectActivityState) {
        this.setProjectActivityState(projectActivityState);
        return this;
    }

    public void setProjectActivityState(String projectActivityState) {
        this.projectActivityState = projectActivityState;
    }

    public Set<PlanningActivity> getPlanningActivities() {
        return this.planningActivities;
    }

    public void setPlanningActivities(Set<PlanningActivity> planningActivities) {
        if (this.planningActivities != null) {
            this.planningActivities.forEach(i -> i.setProjectActivity(null));
        }
        if (planningActivities != null) {
            planningActivities.forEach(i -> i.setProjectActivity(this));
        }
        this.planningActivities = planningActivities;
    }

    public ProjectActivity planningActivities(Set<PlanningActivity> planningActivities) {
        this.setPlanningActivities(planningActivities);
        return this;
    }

    public ProjectActivity addPlanningActivity(PlanningActivity planningActivity) {
        this.planningActivities.add(planningActivity);
        planningActivity.setProjectActivity(this);
        return this;
    }

    public ProjectActivity removePlanningActivity(PlanningActivity planningActivity) {
        this.planningActivities.remove(planningActivity);
        planningActivity.setProjectActivity(null);
        return this;
    }

    public ProjectPhase getProjectPhase() {
        return this.projectPhase;
    }

    public void setProjectPhase(ProjectPhase projectPhase) {
        this.projectPhase = projectPhase;
    }

    public ProjectActivity projectPhase(ProjectPhase projectPhase) {
        this.setProjectPhase(projectPhase);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectActivity)) {
            return false;
        }
        return getId() != null && getId().equals(((ProjectActivity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectActivity{" +
            "id=" + getId() +
            ", activityNumber=" + getActivityNumber() +
            ", activityDescription='" + getActivityDescription() + "'" +
            ", projectActivityState='" + getProjectActivityState() + "'" +
            "}";
    }
}
