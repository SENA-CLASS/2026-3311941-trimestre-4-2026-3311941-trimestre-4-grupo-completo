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
 * A Area.
 */
@Document(collection = "area")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Area implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 200)
    @Field("area_name")
    private String areaName;

    @Size(max = 1000)
    @Field("url_logo")
    private String urlLogo;

    @NotNull
    @Field("area_state")
    private State areaState;

    @DBRef
    @Field("areaInstructor")
    @JsonIgnoreProperties(value = { "area", "instructor" }, allowSetters = true)
    private Set<AreaInstructor> areaInstructors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Area id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAreaName() {
        return this.areaName;
    }

    public Area areaName(String areaName) {
        this.setAreaName(areaName);
        return this;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getUrlLogo() {
        return this.urlLogo;
    }

    public Area urlLogo(String urlLogo) {
        this.setUrlLogo(urlLogo);
        return this;
    }

    public void setUrlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
    }

    public State getAreaState() {
        return this.areaState;
    }

    public Area areaState(State areaState) {
        this.setAreaState(areaState);
        return this;
    }

    public void setAreaState(State areaState) {
        this.areaState = areaState;
    }

    public Set<AreaInstructor> getAreaInstructors() {
        return this.areaInstructors;
    }

    public void setAreaInstructors(Set<AreaInstructor> areaInstructors) {
        if (this.areaInstructors != null) {
            this.areaInstructors.forEach(i -> i.setArea(null));
        }
        if (areaInstructors != null) {
            areaInstructors.forEach(i -> i.setArea(this));
        }
        this.areaInstructors = areaInstructors;
    }

    public Area areaInstructors(Set<AreaInstructor> areaInstructors) {
        this.setAreaInstructors(areaInstructors);
        return this;
    }

    public Area addAreaInstructor(AreaInstructor areaInstructor) {
        this.areaInstructors.add(areaInstructor);
        areaInstructor.setArea(this);
        return this;
    }

    public Area removeAreaInstructor(AreaInstructor areaInstructor) {
        this.areaInstructors.remove(areaInstructor);
        areaInstructor.setArea(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Area)) {
            return false;
        }
        return getId() != null && getId().equals(((Area) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Area{" +
            "id=" + getId() +
            ", areaName='" + getAreaName() + "'" +
            ", urlLogo='" + getUrlLogo() + "'" +
            ", areaState='" + getAreaState() + "'" +
            "}";
    }
}
