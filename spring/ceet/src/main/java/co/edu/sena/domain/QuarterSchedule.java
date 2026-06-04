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
 * A QuarterSchedule.
 */
@Document(collection = "quarter_schedule")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuarterSchedule implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("planningActivity")
    @JsonIgnoreProperties(value = { "quarterSchedule", "projectActivity" }, allowSetters = true)
    private Set<PlanningActivity> planningActivities = new HashSet<>();

    @DBRef
    @Field("learningResult")
    @JsonIgnoreProperties(
        value = { "quarterSchedules", "classroomLimitations", "itemLists", "viewedResults", "learningCompetence" },
        allowSetters = true
    )
    private LearningResult learningResult;

    @DBRef
    @Field("planning")
    @JsonIgnoreProperties(value = { "coursePlannings", "viewedResults", "quarterSchedules" }, allowSetters = true)
    private Planning planning;

    @DBRef
    @Field("trimester")
    @JsonIgnoreProperties(value = { "courseTrimesters", "quarterSchedules", "workingDayCourse", "levelEducations" }, allowSetters = true)
    private Trimester trimester;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public QuarterSchedule id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<PlanningActivity> getPlanningActivities() {
        return this.planningActivities;
    }

    public void setPlanningActivities(Set<PlanningActivity> planningActivities) {
        if (this.planningActivities != null) {
            this.planningActivities.forEach(i -> i.setQuarterSchedule(null));
        }
        if (planningActivities != null) {
            planningActivities.forEach(i -> i.setQuarterSchedule(this));
        }
        this.planningActivities = planningActivities;
    }

    public QuarterSchedule planningActivities(Set<PlanningActivity> planningActivities) {
        this.setPlanningActivities(planningActivities);
        return this;
    }

    public QuarterSchedule addPlanningActivity(PlanningActivity planningActivity) {
        this.planningActivities.add(planningActivity);
        planningActivity.setQuarterSchedule(this);
        return this;
    }

    public QuarterSchedule removePlanningActivity(PlanningActivity planningActivity) {
        this.planningActivities.remove(planningActivity);
        planningActivity.setQuarterSchedule(null);
        return this;
    }

    public LearningResult getLearningResult() {
        return this.learningResult;
    }

    public void setLearningResult(LearningResult learningResult) {
        this.learningResult = learningResult;
    }

    public QuarterSchedule learningResult(LearningResult learningResult) {
        this.setLearningResult(learningResult);
        return this;
    }

    public Planning getPlanning() {
        return this.planning;
    }

    public void setPlanning(Planning planning) {
        this.planning = planning;
    }

    public QuarterSchedule planning(Planning planning) {
        this.setPlanning(planning);
        return this;
    }

    public Trimester getTrimester() {
        return this.trimester;
    }

    public void setTrimester(Trimester trimester) {
        this.trimester = trimester;
    }

    public QuarterSchedule trimester(Trimester trimester) {
        this.setTrimester(trimester);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuarterSchedule)) {
            return false;
        }
        return getId() != null && getId().equals(((QuarterSchedule) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuarterSchedule{" +
            "id=" + getId() +
            "}";
    }
}
