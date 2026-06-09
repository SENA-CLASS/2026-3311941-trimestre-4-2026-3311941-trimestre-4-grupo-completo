package co.edu.sena.domain;

import static co.edu.sena.domain.CoursePlanningTestSamples.*;
import static co.edu.sena.domain.PlanningTestSamples.*;
import static co.edu.sena.domain.QuarterScheduleTestSamples.*;
import static co.edu.sena.domain.ViewedResultTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PlanningTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Planning.class);
        Planning planning1 = getPlanningSample1();
        Planning planning2 = new Planning();
        assertThat(planning1).isNotEqualTo(planning2);

        planning2.setId(planning1.getId());
        assertThat(planning1).isEqualTo(planning2);

        planning2 = getPlanningSample2();
        assertThat(planning1).isNotEqualTo(planning2);
    }

    @Test
    void coursePlanningTest() {
        Planning planning = getPlanningRandomSampleGenerator();
        CoursePlanning coursePlanningBack = getCoursePlanningRandomSampleGenerator();

        planning.addCoursePlanning(coursePlanningBack);
        assertThat(planning.getCoursePlannings()).containsOnly(coursePlanningBack);
        assertThat(coursePlanningBack.getPlanning()).isEqualTo(planning);

        planning.removeCoursePlanning(coursePlanningBack);
        assertThat(planning.getCoursePlannings()).doesNotContain(coursePlanningBack);
        assertThat(coursePlanningBack.getPlanning()).isNull();

        planning.coursePlannings(new HashSet<>(Set.of(coursePlanningBack)));
        assertThat(planning.getCoursePlannings()).containsOnly(coursePlanningBack);
        assertThat(coursePlanningBack.getPlanning()).isEqualTo(planning);

        planning.setCoursePlannings(new HashSet<>());
        assertThat(planning.getCoursePlannings()).doesNotContain(coursePlanningBack);
        assertThat(coursePlanningBack.getPlanning()).isNull();
    }

    @Test
    void viewedResultTest() {
        Planning planning = getPlanningRandomSampleGenerator();
        ViewedResult viewedResultBack = getViewedResultRandomSampleGenerator();

        planning.addViewedResult(viewedResultBack);
        assertThat(planning.getViewedResults()).containsOnly(viewedResultBack);
        assertThat(viewedResultBack.getPlanning()).isEqualTo(planning);

        planning.removeViewedResult(viewedResultBack);
        assertThat(planning.getViewedResults()).doesNotContain(viewedResultBack);
        assertThat(viewedResultBack.getPlanning()).isNull();

        planning.viewedResults(new HashSet<>(Set.of(viewedResultBack)));
        assertThat(planning.getViewedResults()).containsOnly(viewedResultBack);
        assertThat(viewedResultBack.getPlanning()).isEqualTo(planning);

        planning.setViewedResults(new HashSet<>());
        assertThat(planning.getViewedResults()).doesNotContain(viewedResultBack);
        assertThat(viewedResultBack.getPlanning()).isNull();
    }

    @Test
    void quarterScheduleTest() {
        Planning planning = getPlanningRandomSampleGenerator();
        QuarterSchedule quarterScheduleBack = getQuarterScheduleRandomSampleGenerator();

        planning.addQuarterSchedule(quarterScheduleBack);
        assertThat(planning.getQuarterSchedules()).containsOnly(quarterScheduleBack);
        assertThat(quarterScheduleBack.getPlanning()).isEqualTo(planning);

        planning.removeQuarterSchedule(quarterScheduleBack);
        assertThat(planning.getQuarterSchedules()).doesNotContain(quarterScheduleBack);
        assertThat(quarterScheduleBack.getPlanning()).isNull();

        planning.quarterSchedules(new HashSet<>(Set.of(quarterScheduleBack)));
        assertThat(planning.getQuarterSchedules()).containsOnly(quarterScheduleBack);
        assertThat(quarterScheduleBack.getPlanning()).isEqualTo(planning);

        planning.setQuarterSchedules(new HashSet<>());
        assertThat(planning.getQuarterSchedules()).doesNotContain(quarterScheduleBack);
        assertThat(quarterScheduleBack.getPlanning()).isNull();
    }
}
