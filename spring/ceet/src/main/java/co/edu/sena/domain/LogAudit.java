package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A LogAudit.
 */
@Document(collection = "log_audit")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LogAudit implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 400)
    @Field("level_audit")
    private String levelAudit;

    @NotNull
    @Size(max = 400)
    @Field("log_name")
    private String logName;

    @NotNull
    @Size(max = 400)
    @Field("message_audit")
    private String messageAudit;

    @NotNull
    @Field("date_audit")
    private ZonedDateTime dateAudit;

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties(
        value = {
            "user", "apprentices", "logErrors", "logAudits", "generalObservations", "observationResponses", "instructors", "documentType",
        },
        allowSetters = true
    )
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public LogAudit id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLevelAudit() {
        return this.levelAudit;
    }

    public LogAudit levelAudit(String levelAudit) {
        this.setLevelAudit(levelAudit);
        return this;
    }

    public void setLevelAudit(String levelAudit) {
        this.levelAudit = levelAudit;
    }

    public String getLogName() {
        return this.logName;
    }

    public LogAudit logName(String logName) {
        this.setLogName(logName);
        return this;
    }

    public void setLogName(String logName) {
        this.logName = logName;
    }

    public String getMessageAudit() {
        return this.messageAudit;
    }

    public LogAudit messageAudit(String messageAudit) {
        this.setMessageAudit(messageAudit);
        return this;
    }

    public void setMessageAudit(String messageAudit) {
        this.messageAudit = messageAudit;
    }

    public ZonedDateTime getDateAudit() {
        return this.dateAudit;
    }

    public LogAudit dateAudit(ZonedDateTime dateAudit) {
        this.setDateAudit(dateAudit);
        return this;
    }

    public void setDateAudit(ZonedDateTime dateAudit) {
        this.dateAudit = dateAudit;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LogAudit customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogAudit)) {
            return false;
        }
        return getId() != null && getId().equals(((LogAudit) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogAudit{" +
            "id=" + getId() +
            ", levelAudit='" + getLevelAudit() + "'" +
            ", logName='" + getLogName() + "'" +
            ", messageAudit='" + getMessageAudit() + "'" +
            ", dateAudit='" + getDateAudit() + "'" +
            "}";
    }
}
