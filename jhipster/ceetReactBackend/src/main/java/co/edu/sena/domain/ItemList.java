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
 * A ItemList.
 */
@Document(collection = "item_list")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ItemList implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("item_number")
    private Integer itemNumber;

    @NotNull
    @Size(max = 1000)
    @Field("question")
    private String question;

    @DBRef
    @Field("groupResponse")
    @JsonIgnoreProperties(value = { "observationResponses", "projectGroup", "assessment", "itemList" }, allowSetters = true)
    private Set<GroupResponse> groupResponses = new HashSet<>();

    @DBRef
    @Field("checkList")
    @JsonIgnoreProperties(value = { "checkListCourses", "itemLists", "trainingProgram" }, allowSetters = true)
    private CheckList checkList;

    @DBRef
    @Field("learningResult")
    @JsonIgnoreProperties(
        value = { "quarterSchedules", "classroomLimitations", "itemLists", "viewedResults", "learningCompetence" },
        allowSetters = true
    )
    private LearningResult learningResult;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ItemList id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getItemNumber() {
        return this.itemNumber;
    }

    public ItemList itemNumber(Integer itemNumber) {
        this.setItemNumber(itemNumber);
        return this;
    }

    public void setItemNumber(Integer itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getQuestion() {
        return this.question;
    }

    public ItemList question(String question) {
        this.setQuestion(question);
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Set<GroupResponse> getGroupResponses() {
        return this.groupResponses;
    }

    public void setGroupResponses(Set<GroupResponse> groupResponses) {
        if (this.groupResponses != null) {
            this.groupResponses.forEach(i -> i.setItemList(null));
        }
        if (groupResponses != null) {
            groupResponses.forEach(i -> i.setItemList(this));
        }
        this.groupResponses = groupResponses;
    }

    public ItemList groupResponses(Set<GroupResponse> groupResponses) {
        this.setGroupResponses(groupResponses);
        return this;
    }

    public ItemList addGroupResponse(GroupResponse groupResponse) {
        this.groupResponses.add(groupResponse);
        groupResponse.setItemList(this);
        return this;
    }

    public ItemList removeGroupResponse(GroupResponse groupResponse) {
        this.groupResponses.remove(groupResponse);
        groupResponse.setItemList(null);
        return this;
    }

    public CheckList getCheckList() {
        return this.checkList;
    }

    public void setCheckList(CheckList checkList) {
        this.checkList = checkList;
    }

    public ItemList checkList(CheckList checkList) {
        this.setCheckList(checkList);
        return this;
    }

    public LearningResult getLearningResult() {
        return this.learningResult;
    }

    public void setLearningResult(LearningResult learningResult) {
        this.learningResult = learningResult;
    }

    public ItemList learningResult(LearningResult learningResult) {
        this.setLearningResult(learningResult);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemList)) {
            return false;
        }
        return getId() != null && getId().equals(((ItemList) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemList{" +
            "id=" + getId() +
            ", itemNumber=" + getItemNumber() +
            ", question='" + getQuestion() + "'" +
            "}";
    }
}
