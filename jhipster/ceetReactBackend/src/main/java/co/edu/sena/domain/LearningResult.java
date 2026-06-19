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
 * A LearningResult.
 */
@Document(collection = "learning_result")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LearningResult implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("result_code")
    private String resultCode;

    @NotNull
    @Size(max = 1000)
    @Field("denomination")
    private String denomination;

    @DBRef
    @Field("quarterSchedule")
    @JsonIgnoreProperties(value = { "planningActivities", "learningResult", "planning", "trimester" }, allowSetters = true)
    private Set<QuarterSchedule> quarterSchedules = new HashSet<>();

    @DBRef
    @Field("classroomLimitation")
    @JsonIgnoreProperties(value = { "classroom", "learningResult" }, allowSetters = true)
    private Set<ClassroomLimitation> classroomLimitations = new HashSet<>();

    @DBRef
    @Field("itemList")
    @JsonIgnoreProperties(value = { "groupResponses", "checkList", "learningResult" }, allowSetters = true)
    private Set<ItemList> itemLists = new HashSet<>();

    @DBRef
    @Field("viewedResult")
    @JsonIgnoreProperties(value = { "courseTrimester", "planning", "learningResult" }, allowSetters = true)
    private Set<ViewedResult> viewedResults = new HashSet<>();

    @DBRef
    @Field("learningCompetence")
    @JsonIgnoreProperties(value = { "learningResults", "bondingCompetences", "trainingProgram" }, allowSetters = true)
    private LearningCompetence learningCompetence;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public LearningResult id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getResultCode() {
        return this.resultCode;
    }

    public LearningResult resultCode(String resultCode) {
        this.setResultCode(resultCode);
        return this;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getDenomination() {
        return this.denomination;
    }

    public LearningResult denomination(String denomination) {
        this.setDenomination(denomination);
        return this;
    }

    public void setDenomination(String denomination) {
        this.denomination = denomination;
    }

    public Set<QuarterSchedule> getQuarterSchedules() {
        return this.quarterSchedules;
    }

    public void setQuarterSchedules(Set<QuarterSchedule> quarterSchedules) {
        if (this.quarterSchedules != null) {
            this.quarterSchedules.forEach(i -> i.setLearningResult(null));
        }
        if (quarterSchedules != null) {
            quarterSchedules.forEach(i -> i.setLearningResult(this));
        }
        this.quarterSchedules = quarterSchedules;
    }

    public LearningResult quarterSchedules(Set<QuarterSchedule> quarterSchedules) {
        this.setQuarterSchedules(quarterSchedules);
        return this;
    }

    public LearningResult addQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedules.add(quarterSchedule);
        quarterSchedule.setLearningResult(this);
        return this;
    }

    public LearningResult removeQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedules.remove(quarterSchedule);
        quarterSchedule.setLearningResult(null);
        return this;
    }

    public Set<ClassroomLimitation> getClassroomLimitations() {
        return this.classroomLimitations;
    }

    public void setClassroomLimitations(Set<ClassroomLimitation> classroomLimitations) {
        if (this.classroomLimitations != null) {
            this.classroomLimitations.forEach(i -> i.setLearningResult(null));
        }
        if (classroomLimitations != null) {
            classroomLimitations.forEach(i -> i.setLearningResult(this));
        }
        this.classroomLimitations = classroomLimitations;
    }

    public LearningResult classroomLimitations(Set<ClassroomLimitation> classroomLimitations) {
        this.setClassroomLimitations(classroomLimitations);
        return this;
    }

    public LearningResult addClassroomLimitation(ClassroomLimitation classroomLimitation) {
        this.classroomLimitations.add(classroomLimitation);
        classroomLimitation.setLearningResult(this);
        return this;
    }

    public LearningResult removeClassroomLimitation(ClassroomLimitation classroomLimitation) {
        this.classroomLimitations.remove(classroomLimitation);
        classroomLimitation.setLearningResult(null);
        return this;
    }

    public Set<ItemList> getItemLists() {
        return this.itemLists;
    }

    public void setItemLists(Set<ItemList> itemLists) {
        if (this.itemLists != null) {
            this.itemLists.forEach(i -> i.setLearningResult(null));
        }
        if (itemLists != null) {
            itemLists.forEach(i -> i.setLearningResult(this));
        }
        this.itemLists = itemLists;
    }

    public LearningResult itemLists(Set<ItemList> itemLists) {
        this.setItemLists(itemLists);
        return this;
    }

    public LearningResult addItemList(ItemList itemList) {
        this.itemLists.add(itemList);
        itemList.setLearningResult(this);
        return this;
    }

    public LearningResult removeItemList(ItemList itemList) {
        this.itemLists.remove(itemList);
        itemList.setLearningResult(null);
        return this;
    }

    public Set<ViewedResult> getViewedResults() {
        return this.viewedResults;
    }

    public void setViewedResults(Set<ViewedResult> viewedResults) {
        if (this.viewedResults != null) {
            this.viewedResults.forEach(i -> i.setLearningResult(null));
        }
        if (viewedResults != null) {
            viewedResults.forEach(i -> i.setLearningResult(this));
        }
        this.viewedResults = viewedResults;
    }

    public LearningResult viewedResults(Set<ViewedResult> viewedResults) {
        this.setViewedResults(viewedResults);
        return this;
    }

    public LearningResult addViewedResult(ViewedResult viewedResult) {
        this.viewedResults.add(viewedResult);
        viewedResult.setLearningResult(this);
        return this;
    }

    public LearningResult removeViewedResult(ViewedResult viewedResult) {
        this.viewedResults.remove(viewedResult);
        viewedResult.setLearningResult(null);
        return this;
    }

    public LearningCompetence getLearningCompetence() {
        return this.learningCompetence;
    }

    public void setLearningCompetence(LearningCompetence learningCompetence) {
        this.learningCompetence = learningCompetence;
    }

    public LearningResult learningCompetence(LearningCompetence learningCompetence) {
        this.setLearningCompetence(learningCompetence);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningResult)) {
            return false;
        }
        return getId() != null && getId().equals(((LearningResult) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningResult{" +
            "id=" + getId() +
            ", resultCode='" + getResultCode() + "'" +
            ", denomination='" + getDenomination() + "'" +
            "}";
    }
}
