package co.edu.sena.domain;

import static co.edu.sena.domain.CheckListTestSamples.*;
import static co.edu.sena.domain.GroupResponseTestSamples.*;
import static co.edu.sena.domain.ItemListTestSamples.*;
import static co.edu.sena.domain.LearningResultTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ItemListTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemList.class);
        ItemList itemList1 = getItemListSample1();
        ItemList itemList2 = new ItemList();
        assertThat(itemList1).isNotEqualTo(itemList2);

        itemList2.setId(itemList1.getId());
        assertThat(itemList1).isEqualTo(itemList2);

        itemList2 = getItemListSample2();
        assertThat(itemList1).isNotEqualTo(itemList2);
    }

    @Test
    void groupResponseTest() {
        ItemList itemList = getItemListRandomSampleGenerator();
        GroupResponse groupResponseBack = getGroupResponseRandomSampleGenerator();

        itemList.addGroupResponse(groupResponseBack);
        assertThat(itemList.getGroupResponses()).containsOnly(groupResponseBack);
        assertThat(groupResponseBack.getItemList()).isEqualTo(itemList);

        itemList.removeGroupResponse(groupResponseBack);
        assertThat(itemList.getGroupResponses()).doesNotContain(groupResponseBack);
        assertThat(groupResponseBack.getItemList()).isNull();

        itemList.groupResponses(new HashSet<>(Set.of(groupResponseBack)));
        assertThat(itemList.getGroupResponses()).containsOnly(groupResponseBack);
        assertThat(groupResponseBack.getItemList()).isEqualTo(itemList);

        itemList.setGroupResponses(new HashSet<>());
        assertThat(itemList.getGroupResponses()).doesNotContain(groupResponseBack);
        assertThat(groupResponseBack.getItemList()).isNull();
    }

    @Test
    void checkListTest() {
        ItemList itemList = getItemListRandomSampleGenerator();
        CheckList checkListBack = getCheckListRandomSampleGenerator();

        itemList.setCheckList(checkListBack);
        assertThat(itemList.getCheckList()).isEqualTo(checkListBack);

        itemList.checkList(null);
        assertThat(itemList.getCheckList()).isNull();
    }

    @Test
    void learningResultTest() {
        ItemList itemList = getItemListRandomSampleGenerator();
        LearningResult learningResultBack = getLearningResultRandomSampleGenerator();

        itemList.setLearningResult(learningResultBack);
        assertThat(itemList.getLearningResult()).isEqualTo(learningResultBack);

        itemList.learningResult(null);
        assertThat(itemList.getLearningResult()).isNull();
    }
}
