package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
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
 * A Planning.
 */
@Document(collection = "planning")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Planning implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("planning_code")
    private String planningCode;

    @NotNull
    @Field("planning_date")
    private ZonedDateTime planningDate;

    @NotNull
    @Field("planning_state")
    private State planningState;

    @DBRef
    @Field("coursePlanning")
    @JsonIgnoreProperties(value = { "course", "planning" }, allowSetters = true)
    private Set<CoursePlanning> coursePlannings = new HashSet<>();

    @DBRef
    @Field("viewedResult")
    @JsonIgnoreProperties(value = { "courseTrimester", "planning", "learningResult" }, allowSetters = true)
    private Set<ViewedResult> viewedResults = new HashSet<>();

    @DBRef
    @Field("quarterSchedule")
    @JsonIgnoreProperties(value = { "planningActivities", "learningResult", "planning", "trimester" }, allowSetters = true)
    private Set<QuarterSchedule> quarterSchedules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Planning id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPlanningCode() {
        return this.planningCode;
    }

    public Planning planningCode(String planningCode) {
        this.setPlanningCode(planningCode);
        return this;
    }

    public void setPlanningCode(String planningCode) {
        this.planningCode = planningCode;
    }

    public ZonedDateTime getPlanningDate() {
        return this.planningDate;
    }

    public Planning planningDate(ZonedDateTime planningDate) {
        this.setPlanningDate(planningDate);
        return this;
    }

    public void setPlanningDate(ZonedDateTime planningDate) {
        this.planningDate = planningDate;
    }

    public State getPlanningState() {
        return this.planningState;
    }

    public Planning planningState(State planningState) {
        this.setPlanningState(planningState);
        return this;
    }

    public void setPlanningState(State planningState) {
        this.planningState = planningState;
    }

    public Set<CoursePlanning> getCoursePlannings() {
        return this.coursePlannings;
    }

    public void setCoursePlannings(Set<CoursePlanning> coursePlannings) {
        if (this.coursePlannings != null) {
            this.coursePlannings.forEach(i -> i.setPlanning(null));
        }
        if (coursePlannings != null) {
            coursePlannings.forEach(i -> i.setPlanning(this));
        }
        this.coursePlannings = coursePlannings;
    }

    public Planning coursePlannings(Set<CoursePlanning> coursePlannings) {
        this.setCoursePlannings(coursePlannings);
        return this;
    }

    public Planning addCoursePlanning(CoursePlanning coursePlanning) {
        this.coursePlannings.add(coursePlanning);
        coursePlanning.setPlanning(this);
        return this;
    }

    public Planning removeCoursePlanning(CoursePlanning coursePlanning) {
        this.coursePlannings.remove(coursePlanning);
        coursePlanning.setPlanning(null);
        return this;
    }

    public Set<ViewedResult> getViewedResults() {
        return this.viewedResults;
    }

    public void setViewedResults(Set<ViewedResult> viewedResults) {
        if (this.viewedResults != null) {
            this.viewedResults.forEach(i -> i.setPlanning(null));
        }
        if (viewedResults != null) {
            viewedResults.forEach(i -> i.setPlanning(this));
        }
        this.viewedResults = viewedResults;
    }

    public Planning viewedResults(Set<ViewedResult> viewedResults) {
        this.setViewedResults(viewedResults);
        return this;
    }

    public Planning addViewedResult(ViewedResult viewedResult) {
        this.viewedResults.add(viewedResult);
        viewedResult.setPlanning(this);
        return this;
    }

    public Planning removeViewedResult(ViewedResult viewedResult) {
        this.viewedResults.remove(viewedResult);
        viewedResult.setPlanning(null);
        return this;
    }

    public Set<QuarterSchedule> getQuarterSchedules() {
        return this.quarterSchedules;
    }

    public void setQuarterSchedules(Set<QuarterSchedule> quarterSchedules) {
        if (this.quarterSchedules != null) {
            this.quarterSchedules.forEach(i -> i.setPlanning(null));
        }
        if (quarterSchedules != null) {
            quarterSchedules.forEach(i -> i.setPlanning(this));
        }
        this.quarterSchedules = quarterSchedules;
    }

    public Planning quarterSchedules(Set<QuarterSchedule> quarterSchedules) {
        this.setQuarterSchedules(quarterSchedules);
        return this;
    }

    public Planning addQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedules.add(quarterSchedule);
        quarterSchedule.setPlanning(this);
        return this;
    }

    public Planning removeQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedules.remove(quarterSchedule);
        quarterSchedule.setPlanning(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Planning)) {
            return false;
        }
        return getId() != null && getId().equals(((Planning) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Planning{" +
            "id=" + getId() +
            ", planningCode='" + getPlanningCode() + "'" +
            ", planningDate='" + getPlanningDate() + "'" +
            ", planningState='" + getPlanningState() + "'" +
            "}";
    }
}
