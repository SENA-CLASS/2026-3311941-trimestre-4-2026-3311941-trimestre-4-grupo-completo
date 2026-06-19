package co.edu.sena.domain;

import static co.edu.sena.domain.AssessmentTestSamples.*;
import static co.edu.sena.domain.GroupResponseTestSamples.*;
import static co.edu.sena.domain.ItemListTestSamples.*;
import static co.edu.sena.domain.ObservationResponseTestSamples.*;
import static co.edu.sena.domain.ProjectGroupTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class GroupResponseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupResponse.class);
        GroupResponse groupResponse1 = getGroupResponseSample1();
        GroupResponse groupResponse2 = new GroupResponse();
        assertThat(groupResponse1).isNotEqualTo(groupResponse2);

        groupResponse2.setId(groupResponse1.getId());
        assertThat(groupResponse1).isEqualTo(groupResponse2);

        groupResponse2 = getGroupResponseSample2();
        assertThat(groupResponse1).isNotEqualTo(groupResponse2);
    }

    @Test
    void observationResponseTest() {
        GroupResponse groupResponse = getGroupResponseRandomSampleGenerator();
        ObservationResponse observationResponseBack = getObservationResponseRandomSampleGenerator();

        groupResponse.addObservationResponse(observationResponseBack);
        assertThat(groupResponse.getObservationResponses()).containsOnly(observationResponseBack);
        assertThat(observationResponseBack.getGroupResponse()).isEqualTo(groupResponse);

        groupResponse.removeObservationResponse(observationResponseBack);
        assertThat(groupResponse.getObservationResponses()).doesNotContain(observationResponseBack);
        assertThat(observationResponseBack.getGroupResponse()).isNull();

        groupResponse.observationResponses(new HashSet<>(Set.of(observationResponseBack)));
        assertThat(groupResponse.getObservationResponses()).containsOnly(observationResponseBack);
        assertThat(observationResponseBack.getGroupResponse()).isEqualTo(groupResponse);

        groupResponse.setObservationResponses(new HashSet<>());
        assertThat(groupResponse.getObservationResponses()).doesNotContain(observationResponseBack);
        assertThat(observationResponseBack.getGroupResponse()).isNull();
    }

    @Test
    void projectGroupTest() {
        GroupResponse groupResponse = getGroupResponseRandomSampleGenerator();
        ProjectGroup projectGroupBack = getProjectGroupRandomSampleGenerator();

        groupResponse.setProjectGroup(projectGroupBack);
        assertThat(groupResponse.getProjectGroup()).isEqualTo(projectGroupBack);

        groupResponse.projectGroup(null);
        assertThat(groupResponse.getProjectGroup()).isNull();
    }

    @Test
    void assessmentTest() {
        GroupResponse groupResponse = getGroupResponseRandomSampleGenerator();
        Assessment assessmentBack = getAssessmentRandomSampleGenerator();

        groupResponse.setAssessment(assessmentBack);
        assertThat(groupResponse.getAssessment()).isEqualTo(assessmentBack);

        groupResponse.assessment(null);
        assertThat(groupResponse.getAssessment()).isNull();
    }

    @Test
    void itemListTest() {
        GroupResponse groupResponse = getGroupResponseRandomSampleGenerator();
        ItemList itemListBack = getItemListRandomSampleGenerator();

        groupResponse.setItemList(itemListBack);
        assertThat(groupResponse.getItemList()).isEqualTo(itemListBack);

        groupResponse.itemList(null);
        assertThat(groupResponse.getItemList()).isNull();
    }
}
