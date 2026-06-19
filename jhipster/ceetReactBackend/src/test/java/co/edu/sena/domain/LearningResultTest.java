package co.edu.sena.domain;

import static co.edu.sena.domain.ClassroomLimitationTestSamples.*;
import static co.edu.sena.domain.ItemListTestSamples.*;
import static co.edu.sena.domain.LearningCompetenceTestSamples.*;
import static co.edu.sena.domain.LearningResultTestSamples.*;
import static co.edu.sena.domain.QuarterScheduleTestSamples.*;
import static co.edu.sena.domain.ViewedResultTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LearningResultTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningResult.class);
        LearningResult learningResult1 = getLearningResultSample1();
        LearningResult learningResult2 = new LearningResult();
        assertThat(learningResult1).isNotEqualTo(learningResult2);

        learningResult2.setId(learningResult1.getId());
        assertThat(learningResult1).isEqualTo(learningResult2);

        learningResult2 = getLearningResultSample2();
        assertThat(learningResult1).isNotEqualTo(learningResult2);
    }

    @Test
    void quarterScheduleTest() {
        LearningResult learningResult = getLearningResultRandomSampleGenerator();
        QuarterSchedule quarterScheduleBack = getQuarterScheduleRandomSampleGenerator();

        learningResult.addQuarterSchedule(quarterScheduleBack);
        assertThat(learningResult.getQuarterSchedules()).containsOnly(quarterScheduleBack);
        assertThat(quarterScheduleBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.removeQuarterSchedule(quarterScheduleBack);
        assertThat(learningResult.getQuarterSchedules()).doesNotContain(quarterScheduleBack);
        assertThat(quarterScheduleBack.getLearningResult()).isNull();

        learningResult.quarterSchedules(new HashSet<>(Set.of(quarterScheduleBack)));
        assertThat(learningResult.getQuarterSchedules()).containsOnly(quarterScheduleBack);
        assertThat(quarterScheduleBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.setQuarterSchedules(new HashSet<>());
        assertThat(learningResult.getQuarterSchedules()).doesNotContain(quarterScheduleBack);
        assertThat(quarterScheduleBack.getLearningResult()).isNull();
    }

    @Test
    void classroomLimitationTest() {
        LearningResult learningResult = getLearningResultRandomSampleGenerator();
        ClassroomLimitation classroomLimitationBack = getClassroomLimitationRandomSampleGenerator();

        learningResult.addClassroomLimitation(classroomLimitationBack);
        assertThat(learningResult.getClassroomLimitations()).containsOnly(classroomLimitationBack);
        assertThat(classroomLimitationBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.removeClassroomLimitation(classroomLimitationBack);
        assertThat(learningResult.getClassroomLimitations()).doesNotContain(classroomLimitationBack);
        assertThat(classroomLimitationBack.getLearningResult()).isNull();

        learningResult.classroomLimitations(new HashSet<>(Set.of(classroomLimitationBack)));
        assertThat(learningResult.getClassroomLimitations()).containsOnly(classroomLimitationBack);
        assertThat(classroomLimitationBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.setClassroomLimitations(new HashSet<>());
        assertThat(learningResult.getClassroomLimitations()).doesNotContain(classroomLimitationBack);
        assertThat(classroomLimitationBack.getLearningResult()).isNull();
    }

    @Test
    void itemListTest() {
        LearningResult learningResult = getLearningResultRandomSampleGenerator();
        ItemList itemListBack = getItemListRandomSampleGenerator();

        learningResult.addItemList(itemListBack);
        assertThat(learningResult.getItemLists()).containsOnly(itemListBack);
        assertThat(itemListBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.removeItemList(itemListBack);
        assertThat(learningResult.getItemLists()).doesNotContain(itemListBack);
        assertThat(itemListBack.getLearningResult()).isNull();

        learningResult.itemLists(new HashSet<>(Set.of(itemListBack)));
        assertThat(learningResult.getItemLists()).containsOnly(itemListBack);
        assertThat(itemListBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.setItemLists(new HashSet<>());
        assertThat(learningResult.getItemLists()).doesNotContain(itemListBack);
        assertThat(itemListBack.getLearningResult()).isNull();
    }

    @Test
    void viewedResultTest() {
        LearningResult learningResult = getLearningResultRandomSampleGenerator();
        ViewedResult viewedResultBack = getViewedResultRandomSampleGenerator();

        learningResult.addViewedResult(viewedResultBack);
        assertThat(learningResult.getViewedResults()).containsOnly(viewedResultBack);
        assertThat(viewedResultBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.removeViewedResult(viewedResultBack);
        assertThat(learningResult.getViewedResults()).doesNotContain(viewedResultBack);
        assertThat(viewedResultBack.getLearningResult()).isNull();

        learningResult.viewedResults(new HashSet<>(Set.of(viewedResultBack)));
        assertThat(learningResult.getViewedResults()).containsOnly(viewedResultBack);
        assertThat(viewedResultBack.getLearningResult()).isEqualTo(learningResult);

        learningResult.setViewedResults(new HashSet<>());
        assertThat(learningResult.getViewedResults()).doesNotContain(viewedResultBack);
        assertThat(viewedResultBack.getLearningResult()).isNull();
    }

    @Test
    void learningCompetenceTest() {
        LearningResult learningResult = getLearningResultRandomSampleGenerator();
        LearningCompetence learningCompetenceBack = getLearningCompetenceRandomSampleGenerator();

        learningResult.setLearningCompetence(learningCompetenceBack);
        assertThat(learningResult.getLearningCompetence()).isEqualTo(learningCompetenceBack);

        learningResult.learningCompetence(null);
        assertThat(learningResult.getLearningCompetence()).isNull();
    }
}
