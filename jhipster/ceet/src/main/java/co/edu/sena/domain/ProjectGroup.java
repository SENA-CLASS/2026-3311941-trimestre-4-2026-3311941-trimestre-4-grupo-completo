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
 * A ProjectGroup.
 */
@Document(collection = "project_group")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectGroup implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("group_number")
    private Integer groupNumber;

    @NotNull
    @Size(max = 300)
    @Field("project_name")
    private String projectName;

    @NotNull
    @Field("project_group_state")
    private State projectGroupState;

    @DBRef
    @Field("generalObservation")
    @JsonIgnoreProperties(value = { "projectGroup", "customer" }, allowSetters = true)
    private Set<GeneralObservation> generalObservations = new HashSet<>();

    @DBRef
    @Field("memberGroup")
    @JsonIgnoreProperties(value = { "projectGroup", "apprentice" }, allowSetters = true)
    private Set<MemberGroup> memberGroups = new HashSet<>();

    @DBRef
    @Field("groupResponse")
    @JsonIgnoreProperties(value = { "observationResponses", "projectGroup", "assessment", "itemList" }, allowSetters = true)
    private Set<GroupResponse> groupResponses = new HashSet<>();

    @DBRef
    @Field("course")
    @JsonIgnoreProperties(
        value = {
            "apprentices",
            "courseTrimesters",
            "coursePlannings",
            "projectGroups",
            "checkListCourses",
            "courseStatus",
            "workingDayCourse",
            "trainingProgram",
        },
        allowSetters = true
    )
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ProjectGroup id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getGroupNumber() {
        return this.groupNumber;
    }

    public ProjectGroup groupNumber(Integer groupNumber) {
        this.setGroupNumber(groupNumber);
        return this;
    }

    public void setGroupNumber(Integer groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String getProjectName() {
        return this.projectName;
    }

    public ProjectGroup projectName(String projectName) {
        this.setProjectName(projectName);
        return this;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public State getProjectGroupState() {
        return this.projectGroupState;
    }

    public ProjectGroup projectGroupState(State projectGroupState) {
        this.setProjectGroupState(projectGroupState);
        return this;
    }

    public void setProjectGroupState(State projectGroupState) {
        this.projectGroupState = projectGroupState;
    }

    public Set<GeneralObservation> getGeneralObservations() {
        return this.generalObservations;
    }

    public void setGeneralObservations(Set<GeneralObservation> generalObservations) {
        if (this.generalObservations != null) {
            this.generalObservations.forEach(i -> i.setProjectGroup(null));
        }
        if (generalObservations != null) {
            generalObservations.forEach(i -> i.setProjectGroup(this));
        }
        this.generalObservations = generalObservations;
    }

    public ProjectGroup generalObservations(Set<GeneralObservation> generalObservations) {
        this.setGeneralObservations(generalObservations);
        return this;
    }

    public ProjectGroup addGeneralObservation(GeneralObservation generalObservation) {
        this.generalObservations.add(generalObservation);
        generalObservation.setProjectGroup(this);
        return this;
    }

    public ProjectGroup removeGeneralObservation(GeneralObservation generalObservation) {
        this.generalObservations.remove(generalObservation);
        generalObservation.setProjectGroup(null);
        return this;
    }

    public Set<MemberGroup> getMemberGroups() {
        return this.memberGroups;
    }

    public void setMemberGroups(Set<MemberGroup> memberGroups) {
        if (this.memberGroups != null) {
            this.memberGroups.forEach(i -> i.setProjectGroup(null));
        }
        if (memberGroups != null) {
            memberGroups.forEach(i -> i.setProjectGroup(this));
        }
        this.memberGroups = memberGroups;
    }

    public ProjectGroup memberGroups(Set<MemberGroup> memberGroups) {
        this.setMemberGroups(memberGroups);
        return this;
    }

    public ProjectGroup addMemberGroup(MemberGroup memberGroup) {
        this.memberGroups.add(memberGroup);
        memberGroup.setProjectGroup(this);
        return this;
    }

    public ProjectGroup removeMemberGroup(MemberGroup memberGroup) {
        this.memberGroups.remove(memberGroup);
        memberGroup.setProjectGroup(null);
        return this;
    }

    public Set<GroupResponse> getGroupResponses() {
        return this.groupResponses;
    }

    public void setGroupResponses(Set<GroupResponse> groupResponses) {
        if (this.groupResponses != null) {
            this.groupResponses.forEach(i -> i.setProjectGroup(null));
        }
        if (groupResponses != null) {
            groupResponses.forEach(i -> i.setProjectGroup(this));
        }
        this.groupResponses = groupResponses;
    }

    public ProjectGroup groupResponses(Set<GroupResponse> groupResponses) {
        this.setGroupResponses(groupResponses);
        return this;
    }

    public ProjectGroup addGroupResponse(GroupResponse groupResponse) {
        this.groupResponses.add(groupResponse);
        groupResponse.setProjectGroup(this);
        return this;
    }

    public ProjectGroup removeGroupResponse(GroupResponse groupResponse) {
        this.groupResponses.remove(groupResponse);
        groupResponse.setProjectGroup(null);
        return this;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public ProjectGroup course(Course course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectGroup)) {
            return false;
        }
        return getId() != null && getId().equals(((ProjectGroup) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectGroup{" +
            "id=" + getId() +
            ", groupNumber=" + getGroupNumber() +
            ", projectName='" + getProjectName() + "'" +
            ", projectGroupState='" + getProjectGroupState() + "'" +
            "}";
    }
}
