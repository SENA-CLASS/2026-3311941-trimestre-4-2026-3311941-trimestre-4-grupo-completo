package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.MemberGroup} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MemberGroupDTO implements Serializable {

    private String id;

    @NotNull
    private ProjectGroupDTO projectGroup;

    @NotNull
    private ApprenticeDTO apprentice;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ProjectGroupDTO getProjectGroup() {
        return projectGroup;
    }

    public void setProjectGroup(ProjectGroupDTO projectGroup) {
        this.projectGroup = projectGroup;
    }

    public ApprenticeDTO getApprentice() {
        return apprentice;
    }

    public void setApprentice(ApprenticeDTO apprentice) {
        this.apprentice = apprentice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberGroupDTO)) {
            return false;
        }

        MemberGroupDTO memberGroupDTO = (MemberGroupDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, memberGroupDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MemberGroupDTO{" +
            "id='" + getId() + "'" +
            ", projectGroup=" + getProjectGroup() +
            ", apprentice=" + getApprentice() +
            "}";
    }
}
