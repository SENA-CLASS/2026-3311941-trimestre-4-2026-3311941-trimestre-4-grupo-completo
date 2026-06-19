package co.edu.sena.domain;

import static co.edu.sena.domain.ApprenticeTestSamples.*;
import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.DocumentTypeTestSamples.*;
import static co.edu.sena.domain.GeneralObservationTestSamples.*;
import static co.edu.sena.domain.InstructorTestSamples.*;
import static co.edu.sena.domain.LogAuditTestSamples.*;
import static co.edu.sena.domain.LogErrorTestSamples.*;
import static co.edu.sena.domain.ObservationResponseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CustomerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Customer.class);
        Customer customer1 = getCustomerSample1();
        Customer customer2 = new Customer();
        assertThat(customer1).isNotEqualTo(customer2);

        customer2.setId(customer1.getId());
        assertThat(customer1).isEqualTo(customer2);

        customer2 = getCustomerSample2();
        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    void apprenticeTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        Apprentice apprenticeBack = getApprenticeRandomSampleGenerator();

        customer.addApprentice(apprenticeBack);
        assertThat(customer.getApprentices()).containsOnly(apprenticeBack);
        assertThat(apprenticeBack.getCustomer()).isEqualTo(customer);

        customer.removeApprentice(apprenticeBack);
        assertThat(customer.getApprentices()).doesNotContain(apprenticeBack);
        assertThat(apprenticeBack.getCustomer()).isNull();

        customer.apprentices(new HashSet<>(Set.of(apprenticeBack)));
        assertThat(customer.getApprentices()).containsOnly(apprenticeBack);
        assertThat(apprenticeBack.getCustomer()).isEqualTo(customer);

        customer.setApprentices(new HashSet<>());
        assertThat(customer.getApprentices()).doesNotContain(apprenticeBack);
        assertThat(apprenticeBack.getCustomer()).isNull();
    }

    @Test
    void logErrorTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        LogError logErrorBack = getLogErrorRandomSampleGenerator();

        customer.addLogError(logErrorBack);
        assertThat(customer.getLogErrors()).containsOnly(logErrorBack);
        assertThat(logErrorBack.getCustomer()).isEqualTo(customer);

        customer.removeLogError(logErrorBack);
        assertThat(customer.getLogErrors()).doesNotContain(logErrorBack);
        assertThat(logErrorBack.getCustomer()).isNull();

        customer.logErrors(new HashSet<>(Set.of(logErrorBack)));
        assertThat(customer.getLogErrors()).containsOnly(logErrorBack);
        assertThat(logErrorBack.getCustomer()).isEqualTo(customer);

        customer.setLogErrors(new HashSet<>());
        assertThat(customer.getLogErrors()).doesNotContain(logErrorBack);
        assertThat(logErrorBack.getCustomer()).isNull();
    }

    @Test
    void logAuditTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        LogAudit logAuditBack = getLogAuditRandomSampleGenerator();

        customer.addLogAudit(logAuditBack);
        assertThat(customer.getLogAudits()).containsOnly(logAuditBack);
        assertThat(logAuditBack.getCustomer()).isEqualTo(customer);

        customer.removeLogAudit(logAuditBack);
        assertThat(customer.getLogAudits()).doesNotContain(logAuditBack);
        assertThat(logAuditBack.getCustomer()).isNull();

        customer.logAudits(new HashSet<>(Set.of(logAuditBack)));
        assertThat(customer.getLogAudits()).containsOnly(logAuditBack);
        assertThat(logAuditBack.getCustomer()).isEqualTo(customer);

        customer.setLogAudits(new HashSet<>());
        assertThat(customer.getLogAudits()).doesNotContain(logAuditBack);
        assertThat(logAuditBack.getCustomer()).isNull();
    }

    @Test
    void generalObservationTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        GeneralObservation generalObservationBack = getGeneralObservationRandomSampleGenerator();

        customer.addGeneralObservation(generalObservationBack);
        assertThat(customer.getGeneralObservations()).containsOnly(generalObservationBack);
        assertThat(generalObservationBack.getCustomer()).isEqualTo(customer);

        customer.removeGeneralObservation(generalObservationBack);
        assertThat(customer.getGeneralObservations()).doesNotContain(generalObservationBack);
        assertThat(generalObservationBack.getCustomer()).isNull();

        customer.generalObservations(new HashSet<>(Set.of(generalObservationBack)));
        assertThat(customer.getGeneralObservations()).containsOnly(generalObservationBack);
        assertThat(generalObservationBack.getCustomer()).isEqualTo(customer);

        customer.setGeneralObservations(new HashSet<>());
        assertThat(customer.getGeneralObservations()).doesNotContain(generalObservationBack);
        assertThat(generalObservationBack.getCustomer()).isNull();
    }

    @Test
    void observationResponseTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        ObservationResponse observationResponseBack = getObservationResponseRandomSampleGenerator();

        customer.addObservationResponse(observationResponseBack);
        assertThat(customer.getObservationResponses()).containsOnly(observationResponseBack);
        assertThat(observationResponseBack.getCustomer()).isEqualTo(customer);

        customer.removeObservationResponse(observationResponseBack);
        assertThat(customer.getObservationResponses()).doesNotContain(observationResponseBack);
        assertThat(observationResponseBack.getCustomer()).isNull();

        customer.observationResponses(new HashSet<>(Set.of(observationResponseBack)));
        assertThat(customer.getObservationResponses()).containsOnly(observationResponseBack);
        assertThat(observationResponseBack.getCustomer()).isEqualTo(customer);

        customer.setObservationResponses(new HashSet<>());
        assertThat(customer.getObservationResponses()).doesNotContain(observationResponseBack);
        assertThat(observationResponseBack.getCustomer()).isNull();
    }

    @Test
    void instructorTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        Instructor instructorBack = getInstructorRandomSampleGenerator();

        customer.addInstructor(instructorBack);
        assertThat(customer.getInstructors()).containsOnly(instructorBack);
        assertThat(instructorBack.getCustomer()).isEqualTo(customer);

        customer.removeInstructor(instructorBack);
        assertThat(customer.getInstructors()).doesNotContain(instructorBack);
        assertThat(instructorBack.getCustomer()).isNull();

        customer.instructors(new HashSet<>(Set.of(instructorBack)));
        assertThat(customer.getInstructors()).containsOnly(instructorBack);
        assertThat(instructorBack.getCustomer()).isEqualTo(customer);

        customer.setInstructors(new HashSet<>());
        assertThat(customer.getInstructors()).doesNotContain(instructorBack);
        assertThat(instructorBack.getCustomer()).isNull();
    }

    @Test
    void documentTypeTest() {
        Customer customer = getCustomerRandomSampleGenerator();
        DocumentType documentTypeBack = getDocumentTypeRandomSampleGenerator();

        customer.setDocumentType(documentTypeBack);
        assertThat(customer.getDocumentType()).isEqualTo(documentTypeBack);

        customer.documentType(null);
        assertThat(customer.getDocumentType()).isNull();
    }
}
