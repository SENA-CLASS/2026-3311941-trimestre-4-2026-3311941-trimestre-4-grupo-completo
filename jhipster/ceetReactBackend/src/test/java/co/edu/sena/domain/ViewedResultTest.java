package co.edu.sena.domain;

import static co.edu.sena.domain.CourseTrimesterTestSamples.*;
import static co.edu.sena.domain.LearningResultTestSamples.*;
import static co.edu.sena.domain.PlanningTestSamples.*;
import static co.edu.sena.domain.ViewedResultTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ViewedResultTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ViewedResult.class);
        ViewedResult viewedResult1 = getViewedResultSample1();
        ViewedResult viewedResult2 = new ViewedResult();
        assertThat(viewedResult1).isNotEqualTo(viewedResult2);

        viewedResult2.setId(viewedResult1.getId());
        assertThat(viewedResult1).isEqualTo(viewedResult2);

        viewedResult2 = getViewedResultSample2();
        assertThat(viewedResult1).isNotEqualTo(viewedResult2);
    }

    @Test
    void courseTrimesterTest() {
        ViewedResult viewedResult = getViewedResultRandomSampleGenerator();
        CourseTrimester courseTrimesterBack = getCourseTrimesterRandomSampleGenerator();

        viewedResult.setCourseTrimester(courseTrimesterBack);
        assertThat(viewedResult.getCourseTrimester()).isEqualTo(courseTrimesterBack);

        viewedResult.courseTrimester(null);
        assertThat(viewedResult.getCourseTrimester()).isNull();
    }

    @Test
    void planningTest() {
        ViewedResult viewedResult = getViewedResultRandomSampleGenerator();
        Planning planningBack = getPlanningRandomSampleGenerator();

        viewedResult.setPlanning(planningBack);
        assertThat(viewedResult.getPlanning()).isEqualTo(planningBack);

        viewedResult.planning(null);
        assertThat(viewedResult.getPlanning()).isNull();
    }

    @Test
    void learningResultTest() {
        ViewedResult viewedResult = getViewedResultRandomSampleGenerator();
        LearningResult learningResultBack = getLearningResultRandomSampleGenerator();

        viewedResult.setLearningResult(learningResultBack);
        assertThat(viewedResult.getLearningResult()).isEqualTo(learningResultBack);

        viewedResult.learningResult(null);
        assertThat(viewedResult.getLearningResult()).isNull();
    }
}
