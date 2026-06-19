package co.edu.sena.domain;

import static co.edu.sena.domain.LearningResultTestSamples.*;
import static co.edu.sena.domain.PlanningActivityTestSamples.*;
import static co.edu.sena.domain.PlanningTestSamples.*;
import static co.edu.sena.domain.QuarterScheduleTestSamples.*;
import static co.edu.sena.domain.TrimesterTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class QuarterScheduleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuarterSchedule.class);
        QuarterSchedule quarterSchedule1 = getQuarterScheduleSample1();
        QuarterSchedule quarterSchedule2 = new QuarterSchedule();
        assertThat(quarterSchedule1).isNotEqualTo(quarterSchedule2);

        quarterSchedule2.setId(quarterSchedule1.getId());
        assertThat(quarterSchedule1).isEqualTo(quarterSchedule2);

        quarterSchedule2 = getQuarterScheduleSample2();
        assertThat(quarterSchedule1).isNotEqualTo(quarterSchedule2);
    }

    @Test
    void planningActivityTest() {
        QuarterSchedule quarterSchedule = getQuarterScheduleRandomSampleGenerator();
        PlanningActivity planningActivityBack = getPlanningActivityRandomSampleGenerator();

        quarterSchedule.addPlanningActivity(planningActivityBack);
        assertThat(quarterSchedule.getPlanningActivities()).containsOnly(planningActivityBack);
        assertThat(planningActivityBack.getQuarterSchedule()).isEqualTo(quarterSchedule);

        quarterSchedule.removePlanningActivity(planningActivityBack);
        assertThat(quarterSchedule.getPlanningActivities()).doesNotContain(planningActivityBack);
        assertThat(planningActivityBack.getQuarterSchedule()).isNull();

        quarterSchedule.planningActivities(new HashSet<>(Set.of(planningActivityBack)));
        assertThat(quarterSchedule.getPlanningActivities()).containsOnly(planningActivityBack);
        assertThat(planningActivityBack.getQuarterSchedule()).isEqualTo(quarterSchedule);

        quarterSchedule.setPlanningActivities(new HashSet<>());
        assertThat(quarterSchedule.getPlanningActivities()).doesNotContain(planningActivityBack);
        assertThat(planningActivityBack.getQuarterSchedule()).isNull();
    }

    @Test
    void learningResultTest() {
        QuarterSchedule quarterSchedule = getQuarterScheduleRandomSampleGenerator();
        LearningResult learningResultBack = getLearningResultRandomSampleGenerator();

        quarterSchedule.setLearningResult(learningResultBack);
        assertThat(quarterSchedule.getLearningResult()).isEqualTo(learningResultBack);

        quarterSchedule.learningResult(null);
        assertThat(quarterSchedule.getLearningResult()).isNull();
    }

    @Test
    void planningTest() {
        QuarterSchedule quarterSchedule = getQuarterScheduleRandomSampleGenerator();
        Planning planningBack = getPlanningRandomSampleGenerator();

        quarterSchedule.setPlanning(planningBack);
        assertThat(quarterSchedule.getPlanning()).isEqualTo(planningBack);

        quarterSchedule.planning(null);
        assertThat(quarterSchedule.getPlanning()).isNull();
    }

    @Test
    void trimesterTest() {
        QuarterSchedule quarterSchedule = getQuarterScheduleRandomSampleGenerator();
        Trimester trimesterBack = getTrimesterRandomSampleGenerator();

        quarterSchedule.setTrimester(trimesterBack);
        assertThat(quarterSchedule.getTrimester()).isEqualTo(trimesterBack);

        quarterSchedule.trimester(null);
        assertThat(quarterSchedule.getTrimester()).isNull();
    }
}
