package co.edu.sena.domain;

import static co.edu.sena.domain.CoursePlanningTestSamples.*;
import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.PlanningTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CoursePlanningTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoursePlanning.class);
        CoursePlanning coursePlanning1 = getCoursePlanningSample1();
        CoursePlanning coursePlanning2 = new CoursePlanning();
        assertThat(coursePlanning1).isNotEqualTo(coursePlanning2);

        coursePlanning2.setId(coursePlanning1.getId());
        assertThat(coursePlanning1).isEqualTo(coursePlanning2);

        coursePlanning2 = getCoursePlanningSample2();
        assertThat(coursePlanning1).isNotEqualTo(coursePlanning2);
    }

    @Test
    void courseTest() {
        CoursePlanning coursePlanning = getCoursePlanningRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        coursePlanning.setCourse(courseBack);
        assertThat(coursePlanning.getCourse()).isEqualTo(courseBack);

        coursePlanning.course(null);
        assertThat(coursePlanning.getCourse()).isNull();
    }

    @Test
    void planningTest() {
        CoursePlanning coursePlanning = getCoursePlanningRandomSampleGenerator();
        Planning planningBack = getPlanningRandomSampleGenerator();

        coursePlanning.setPlanning(planningBack);
        assertThat(coursePlanning.getPlanning()).isEqualTo(planningBack);

        coursePlanning.planning(null);
        assertThat(coursePlanning.getPlanning()).isNull();
    }
}
