import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCheckLists } from 'app/entities/check-list/check-list.reducer';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './check-list-course.reducer';

export const CheckListCourseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courses = useAppSelector(state => state.course.entities);
  const checkLists = useAppSelector(state => state.checkList.entities);
  const checkListCourseEntity = useAppSelector(state => state.checkListCourse.entity);
  const loading = useAppSelector(state => state.checkListCourse.loading);
  const updating = useAppSelector(state => state.checkListCourse.updating);
  const updateSuccess = useAppSelector(state => state.checkListCourse.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/check-list-course${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourses({}));
    dispatch(getCheckLists({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...checkListCourseEntity,
      ...values,
      course: courses.find(it => it.id.toString() === values.course?.toString()),
      checkList: checkLists.find(it => it.id.toString() === values.checkList?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          checkListState: 'ACTIVE',
          ...checkListCourseEntity,
          course: checkListCourseEntity?.course?.id,
          checkList: checkListCourseEntity?.checkList?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.checkListCourse.home.createOrEditLabel" data-cy="CheckListCourseCreateUpdateHeading">
            <Translate contentKey="ceet2App.checkListCourse.home.createOrEditLabel">Create or edit a CheckListCourse</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="check-list-course-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.checkListCourse.checkListState')}
                id="check-list-course-checkListState"
                name="checkListState"
                data-cy="checkListState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceet2App.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="check-list-course-course"
                name="course"
                data-cy="course"
                label={translate('ceet2App.checkListCourse.course')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="check-list-course-checkList"
                name="checkList"
                data-cy="checkList"
                label={translate('ceet2App.checkListCourse.checkList')}
                type="select"
                required
              >
                <option value="" key="0" />
                {checkLists
                  ? checkLists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/check-list-course" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CheckListCourseUpdate;
