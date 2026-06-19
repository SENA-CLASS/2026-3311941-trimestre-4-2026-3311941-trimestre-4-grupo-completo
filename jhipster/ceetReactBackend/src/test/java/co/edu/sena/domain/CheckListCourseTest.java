package co.edu.sena.domain;

import static co.edu.sena.domain.CheckListCourseTestSamples.*;
import static co.edu.sena.domain.CheckListTestSamples.*;
import static co.edu.sena.domain.CourseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CheckListCourseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckListCourse.class);
        CheckListCourse checkListCourse1 = getCheckListCourseSample1();
        CheckListCourse checkListCourse2 = new CheckListCourse();
        assertThat(checkListCourse1).isNotEqualTo(checkListCourse2);

        checkListCourse2.setId(checkListCourse1.getId());
        assertThat(checkListCourse1).isEqualTo(checkListCourse2);

        checkListCourse2 = getCheckListCourseSample2();
        assertThat(checkListCourse1).isNotEqualTo(checkListCourse2);
    }

    @Test
    void courseTest() {
        CheckListCourse checkListCourse = getCheckListCourseRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        checkListCourse.setCourse(courseBack);
        assertThat(checkListCourse.getCourse()).isEqualTo(courseBack);

        checkListCourse.course(null);
        assertThat(checkListCourse.getCourse()).isNull();
    }

    @Test
    void checkListTest() {
        CheckListCourse checkListCourse = getCheckListCourseRandomSampleGenerator();
        CheckList checkListBack = getCheckListRandomSampleGenerator();

        checkListCourse.setCheckList(checkListBack);
        assertThat(checkListCourse.getCheckList()).isEqualTo(checkListBack);

        checkListCourse.checkList(null);
        assertThat(checkListCourse.getCheckList()).isNull();
    }
}
