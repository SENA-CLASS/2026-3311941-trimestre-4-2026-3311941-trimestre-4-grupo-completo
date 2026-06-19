package co.edu.sena.domain;

import static co.edu.sena.domain.PlanningActivityTestSamples.*;
import static co.edu.sena.domain.ProjectActivityTestSamples.*;
import static co.edu.sena.domain.QuarterScheduleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlanningActivityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanningActivity.class);
        PlanningActivity planningActivity1 = getPlanningActivitySample1();
        PlanningActivity planningActivity2 = new PlanningActivity();
        assertThat(planningActivity1).isNotEqualTo(planningActivity2);

        planningActivity2.setId(planningActivity1.getId());
        assertThat(planningActivity1).isEqualTo(planningActivity2);

        planningActivity2 = getPlanningActivitySample2();
        assertThat(planningActivity1).isNotEqualTo(planningActivity2);
    }

    @Test
    void quarterScheduleTest() {
        PlanningActivity planningActivity = getPlanningActivityRandomSampleGenerator();
        QuarterSchedule quarterScheduleBack = getQuarterScheduleRandomSampleGenerator();

        planningActivity.setQuarterSchedule(quarterScheduleBack);
        assertThat(planningActivity.getQuarterSchedule()).isEqualTo(quarterScheduleBack);

        planningActivity.quarterSchedule(null);
        assertThat(planningActivity.getQuarterSchedule()).isNull();
    }

    @Test
    void projectActivityTest() {
        PlanningActivity planningActivity = getPlanningActivityRandomSampleGenerator();
        ProjectActivity projectActivityBack = getProjectActivityRandomSampleGenerator();

        planningActivity.setProjectActivity(projectActivityBack);
        assertThat(planningActivity.getProjectActivity()).isEqualTo(projectActivityBack);

        planningActivity.projectActivity(null);
        assertThat(planningActivity.getProjectActivity()).isNull();
    }
}
