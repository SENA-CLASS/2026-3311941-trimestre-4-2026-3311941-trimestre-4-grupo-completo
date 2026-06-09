package co.edu.sena.domain;

import static co.edu.sena.domain.CheckListCourseTestSamples.*;
import static co.edu.sena.domain.CheckListTestSamples.*;
import static co.edu.sena.domain.ItemListTestSamples.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CheckListTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckList.class);
        CheckList checkList1 = getCheckListSample1();
        CheckList checkList2 = new CheckList();
        assertThat(checkList1).isNotEqualTo(checkList2);

        checkList2.setId(checkList1.getId());
        assertThat(checkList1).isEqualTo(checkList2);

        checkList2 = getCheckListSample2();
        assertThat(checkList1).isNotEqualTo(checkList2);
    }

    @Test
    void checkListCourseTest() {
        CheckList checkList = getCheckListRandomSampleGenerator();
        CheckListCourse checkListCourseBack = getCheckListCourseRandomSampleGenerator();

        checkList.addCheckListCourse(checkListCourseBack);
        assertThat(checkList.getCheckListCourses()).containsOnly(checkListCourseBack);
        assertThat(checkListCourseBack.getCheckList()).isEqualTo(checkList);

        checkList.removeCheckListCourse(checkListCourseBack);
        assertThat(checkList.getCheckListCourses()).doesNotContain(checkListCourseBack);
        assertThat(checkListCourseBack.getCheckList()).isNull();

        checkList.checkListCourses(new HashSet<>(Set.of(checkListCourseBack)));
        assertThat(checkList.getCheckListCourses()).containsOnly(checkListCourseBack);
        assertThat(checkListCourseBack.getCheckList()).isEqualTo(checkList);

        checkList.setCheckListCourses(new HashSet<>());
        assertThat(checkList.getCheckListCourses()).doesNotContain(checkListCourseBack);
        assertThat(checkListCourseBack.getCheckList()).isNull();
    }

    @Test
    void itemListTest() {
        CheckList checkList = getCheckListRandomSampleGenerator();
        ItemList itemListBack = getItemListRandomSampleGenerator();

        checkList.addItemList(itemListBack);
        assertThat(checkList.getItemLists()).containsOnly(itemListBack);
        assertThat(itemListBack.getCheckList()).isEqualTo(checkList);

        checkList.removeItemList(itemListBack);
        assertThat(checkList.getItemLists()).doesNotContain(itemListBack);
        assertThat(itemListBack.getCheckList()).isNull();

        checkList.itemLists(new HashSet<>(Set.of(itemListBack)));
        assertThat(checkList.getItemLists()).containsOnly(itemListBack);
        assertThat(itemListBack.getCheckList()).isEqualTo(checkList);

        checkList.setItemLists(new HashSet<>());
        assertThat(checkList.getItemLists()).doesNotContain(itemListBack);
        assertThat(itemListBack.getCheckList()).isNull();
    }

    @Test
    void trainingProgramTest() {
        CheckList checkList = getCheckListRandomSampleGenerator();
        TrainingProgram trainingProgramBack = getTrainingProgramRandomSampleGenerator();

        checkList.setTrainingProgram(trainingProgramBack);
        assertThat(checkList.getTrainingProgram()).isEqualTo(trainingProgramBack);

        checkList.trainingProgram(null);
        assertThat(checkList.getTrainingProgram()).isNull();
    }
}
