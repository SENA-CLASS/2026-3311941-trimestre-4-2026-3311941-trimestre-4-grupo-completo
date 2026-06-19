package co.edu.sena.domain;

import static co.edu.sena.domain.AssessmentTestSamples.*;
import static co.edu.sena.domain.GroupResponseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AssessmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assessment.class);
        Assessment assessment1 = getAssessmentSample1();
        Assessment assessment2 = new Assessment();
        assertThat(assessment1).isNotEqualTo(assessment2);

        assessment2.setId(assessment1.getId());
        assertThat(assessment1).isEqualTo(assessment2);

        assessment2 = getAssessmentSample2();
        assertThat(assessment1).isNotEqualTo(assessment2);
    }

    @Test
    void groupResponseTest() {
        Assessment assessment = getAssessmentRandomSampleGenerator();
        GroupResponse groupResponseBack = getGroupResponseRandomSampleGenerator();

        assessment.addGroupResponse(groupResponseBack);
        assertThat(assessment.getGroupResponses()).containsOnly(groupResponseBack);
        assertThat(groupResponseBack.getAssessment()).isEqualTo(assessment);

        assessment.removeGroupResponse(groupResponseBack);
        assertThat(assessment.getGroupResponses()).doesNotContain(groupResponseBack);
        assertThat(groupResponseBack.getAssessment()).isNull();

        assessment.groupResponses(new HashSet<>(Set.of(groupResponseBack)));
        assertThat(assessment.getGroupResponses()).containsOnly(groupResponseBack);
        assertThat(groupResponseBack.getAssessment()).isEqualTo(assessment);

        assessment.setGroupResponses(new HashSet<>());
        assertThat(assessment.getGroupResponses()).doesNotContain(groupResponseBack);
        assertThat(groupResponseBack.getAssessment()).isNull();
    }
}
