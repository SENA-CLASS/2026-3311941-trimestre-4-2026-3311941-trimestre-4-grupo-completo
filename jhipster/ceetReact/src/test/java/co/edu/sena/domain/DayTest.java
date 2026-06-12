package co.edu.sena.domain;

import static co.edu.sena.domain.DayTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static co.edu.sena.domain.WorkingDayTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Day.class);
        Day day1 = getDaySample1();
        Day day2 = new Day();
        assertThat(day1).isNotEqualTo(day2);

        day2.setId(day1.getId());
        assertThat(day1).isEqualTo(day2);

        day2 = getDaySample2();
        assertThat(day1).isNotEqualTo(day2);
    }

    @Test
    void scheduleTest() {
        Day day = getDayRandomSampleGenerator();
        Schedule scheduleBack = getScheduleRandomSampleGenerator();

        day.addSchedule(scheduleBack);
        assertThat(day.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getDay()).isEqualTo(day);

        day.removeSchedule(scheduleBack);
        assertThat(day.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getDay()).isNull();

        day.schedules(new HashSet<>(Set.of(scheduleBack)));
        assertThat(day.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getDay()).isEqualTo(day);

        day.setSchedules(new HashSet<>());
        assertThat(day.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getDay()).isNull();
    }

    @Test
    void workingDayTest() {
        Day day = getDayRandomSampleGenerator();
        WorkingDay workingDayBack = getWorkingDayRandomSampleGenerator();

        day.addWorkingDay(workingDayBack);
        assertThat(day.getWorkingDays()).containsOnly(workingDayBack);
        assertThat(workingDayBack.getDay()).isEqualTo(day);

        day.removeWorkingDay(workingDayBack);
        assertThat(day.getWorkingDays()).doesNotContain(workingDayBack);
        assertThat(workingDayBack.getDay()).isNull();

        day.workingDays(new HashSet<>(Set.of(workingDayBack)));
        assertThat(day.getWorkingDays()).containsOnly(workingDayBack);
        assertThat(workingDayBack.getDay()).isEqualTo(day);

        day.setWorkingDays(new HashSet<>());
        assertThat(day.getWorkingDays()).doesNotContain(workingDayBack);
        assertThat(workingDayBack.getDay()).isNull();
    }
}
