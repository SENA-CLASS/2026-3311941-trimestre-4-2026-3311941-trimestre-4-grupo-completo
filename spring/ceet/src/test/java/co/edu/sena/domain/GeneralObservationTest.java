package co.edu.sena.domain;

import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.GeneralObservationTestSamples.*;
import static co.edu.sena.domain.ProjectGroupTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GeneralObservationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeneralObservation.class);
        GeneralObservation generalObservation1 = getGeneralObservationSample1();
        GeneralObservation generalObservation2 = new GeneralObservation();
        assertThat(generalObservation1).isNotEqualTo(generalObservation2);

        generalObservation2.setId(generalObservation1.getId());
        assertThat(generalObservation1).isEqualTo(generalObservation2);

        generalObservation2 = getGeneralObservationSample2();
        assertThat(generalObservation1).isNotEqualTo(generalObservation2);
    }

    @Test
    void projectGroupTest() {
        GeneralObservation generalObservation = getGeneralObservationRandomSampleGenerator();
        ProjectGroup projectGroupBack = getProjectGroupRandomSampleGenerator();

        generalObservation.setProjectGroup(projectGroupBack);
        assertThat(generalObservation.getProjectGroup()).isEqualTo(projectGroupBack);

        generalObservation.projectGroup(null);
        assertThat(generalObservation.getProjectGroup()).isNull();
    }

    @Test
    void customerTest() {
        GeneralObservation generalObservation = getGeneralObservationRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        generalObservation.setCustomer(customerBack);
        assertThat(generalObservation.getCustomer()).isEqualTo(customerBack);

        generalObservation.customer(null);
        assertThat(generalObservation.getCustomer()).isNull();
    }
}
