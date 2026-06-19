import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntities as getPlannings } from 'app/entities/planning/planning.reducer';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './course-planning.reducer';

export const CoursePlanningUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courses = useAppSelector(state => state.course.entities);
  const plannings = useAppSelector(state => state.planning.entities);
  const coursePlanningEntity = useAppSelector(state => state.coursePlanning.entity);
  const loading = useAppSelector(state => state.coursePlanning.loading);
  const updating = useAppSelector(state => state.coursePlanning.updating);
  const updateSuccess = useAppSelector(state => state.coursePlanning.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/course-planning${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourses({}));
    dispatch(getPlannings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...coursePlanningEntity,
      ...values,
      course: courses.find(it => it.id.toString() === values.course?.toString()),
      planning: plannings.find(it => it.id.toString() === values.planning?.toString()),
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
          stateCoursePlanning: 'ACTIVE',
          ...coursePlanningEntity,
          course: coursePlanningEntity?.course?.id,
          planning: coursePlanningEntity?.planning?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.coursePlanning.home.createOrEditLabel" data-cy="CoursePlanningCreateUpdateHeading">
            <Translate contentKey="ceet2App.coursePlanning.home.createOrEditLabel">Create or edit a CoursePlanning</Translate>
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
                  id="course-planning-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.coursePlanning.stateCoursePlanning')}
                id="course-planning-stateCoursePlanning"
                name="stateCoursePlanning"
                data-cy="stateCoursePlanning"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceet2App.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="course-planning-course"
                name="course"
                data-cy="course"
                label={translate('ceet2App.coursePlanning.course')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.courseNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="course-planning-planning"
                name="planning"
                data-cy="planning"
                label={translate('ceet2App.coursePlanning.planning')}
                type="select"
                required
              >
                <option value="" key="0" />
                {plannings
                  ? plannings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.planningCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/course-planning" replace variant="info">
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

export default CoursePlanningUpdate;
