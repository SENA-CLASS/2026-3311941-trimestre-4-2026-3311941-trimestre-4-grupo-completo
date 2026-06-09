package co.edu.sena.domain;

import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.GroupResponseTestSamples.*;
import static co.edu.sena.domain.ObservationResponseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ObservationResponseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ObservationResponse.class);
        ObservationResponse observationResponse1 = getObservationResponseSample1();
        ObservationResponse observationResponse2 = new ObservationResponse();
        assertThat(observationResponse1).isNotEqualTo(observationResponse2);

        observationResponse2.setId(observationResponse1.getId());
        assertThat(observationResponse1).isEqualTo(observationResponse2);

        observationResponse2 = getObservationResponseSample2();
        assertThat(observationResponse1).isNotEqualTo(observationResponse2);
    }

    @Test
    void groupResponseTest() {
        ObservationResponse observationResponse = getObservationResponseRandomSampleGenerator();
        GroupResponse groupResponseBack = getGroupResponseRandomSampleGenerator();

        observationResponse.setGroupResponse(groupResponseBack);
        assertThat(observationResponse.getGroupResponse()).isEqualTo(groupResponseBack);

        observationResponse.groupResponse(null);
        assertThat(observationResponse.getGroupResponse()).isNull();
    }

    @Test
    void customerTest() {
        ObservationResponse observationResponse = getObservationResponseRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        observationResponse.setCustomer(customerBack);
        assertThat(observationResponse.getCustomer()).isEqualTo(customerBack);

        observationResponse.customer(null);
        assertThat(observationResponse.getCustomer()).isNull();
    }
}
